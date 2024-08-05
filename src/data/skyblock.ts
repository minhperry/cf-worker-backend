import { Context } from "hono";

export const skyblockXpHandler = (c: Context) => {
    const key = c.env.HYPIXEL
    const url = 'https://api.hypixel.net/v2/skyblock/profile?profile=95bb24bd-73f6-427d-b35c-248295674ba1'
    return fetch(url, {
        headers: {
            'API-Key': key
        }
    })
}