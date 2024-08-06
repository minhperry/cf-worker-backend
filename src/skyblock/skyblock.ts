import { Context } from "hono";
import { SkycryptAPI } from "./skycrypt";

export const skyblockXpHandler = (c: Context) => {
    const key = c.env.HYPIXEL
    const user = c.req.param('name')
    const userUUID = SkycryptAPI.getCurrentProfileUUID(user)
    const skyblockData = 'https://api.hypixel.net/v2/skyblock/profile?profile=' + userUUID
    return fetch(skyblockData, {
        headers: {
            'API-Key': key
        }
    })
}