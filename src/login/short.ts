import { Context } from "hono";

export async function createShortUrlHandler(c: Context) {
    const myKey = c.env.MYKEY
    const kv = c.env.shortener

    const providedKey = c.req.header('X-Longass-Api-Header-Name')

    if (providedKey !== myKey) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    try {
        const { key, value } = await c.req.json()

        if (!key) {
            return c.json({ error: 'Key is required' }, 400)
        }

        if (!value) {
            return c.json({ error: 'Value is required' }, 400)
        }

        const existing = await kv.get(key)
        if (existing !== null) {
            return c.json({ error: 'Key already exists' }, 409)
        } 
        
        kv.put(key, value)
        return c.json({ created: { [key]: value }}, 201)
    } catch (err) {
        console.log(err)
        return c.json({ error: 'Internal Server Error' }, 500)
    }
}