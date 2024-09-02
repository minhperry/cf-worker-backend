import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

export type GraphQLResponse = {
    data: {
        repository: {
            ref: {
                target: {
                    history: {
                        edges: CommitEdge[]
                    }
                }
            }
        }
    },
    error?: any
}

type CommitNode = {
    message: string
    committedDate: string
}

type CommitEdge = {
    node: CommitNode
}

export async function getGithubCommits(c: Context, amount: number = 50) {
    const key = c.env.GITHUB
    const url = 'https://api.github.com/graphql'
    const headers = {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'User-Agent': 'minhperry/backend'
    }

    const query = JSON.stringify({ 
        query: `{
        repository(owner: "minhperry", name: "minhperry.github.io") {
            ref(qualifiedName: "main") {
                target {
                    ... on Commit {
                        history(first: ${amount}) {
                            edges {
                                node {
                                    message
                                    committedDate
                                }
                            }
                        }
                    }
                }
            }
        }
    }`})

    try {
        const response = await fetch( url, {
            method: 'POST',
            headers,
            body: query
        })

        if (!response.ok) {
            const errorText = await response.text();
            return c.json({ error: `GitHub API responded with status ${response.status}: ${errorText}` }, response.status as StatusCode);
        }

        const data = await response.json() as GraphQLResponse;

        if (data.error) {
            return c.json({ error: `GitHub GraphQL API error: ${JSON.stringify(data.error)}` }, 400);
        }

        const commits = data.data.repository.ref.target.history.edges.map(edge => ({
            message: edge.node.message,
            commitedDate: edge.node.committedDate
        }));

        return c.json(commits);
    } catch (error) {
        console.error('Error fetching commits from GitHub:', error);
        return c.json({ error: `An unexpected error occurred: ${error}` }, 500);
    }
}