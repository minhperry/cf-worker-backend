import { Context } from "hono";

export const skyblockXpHandler = (c: Context) => {
    const name = c.req.param('name')
    return c.json({
        'player': name
    })
}