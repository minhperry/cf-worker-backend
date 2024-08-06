import { Context } from "hono";
import { Answer, SkycryptAPI } from "./api/skycrypt.api";



export const skyblockXpHandler = async (c: Context) => {
    const key = c.env.HYPIXEL
    const user = c.req.param('name')
    const userUUID = await SkycryptAPI.getCurrentProfileUUID(user)

    if (userUUID === Answer.NONE) {
        return c.json({ reason: 'NO_PROFILE', error: 'No current profile found' }, 404)
    } else if (userUUID === Answer.ERROR) {
        return c.json({ reason: 'INTERNAL', error: 'An error occurred while fetching the profile' }, 500)
    } else if (userUUID === Answer.NOT_FOUND) {
        return c.json({ reason: 'NOT_FOUND', error: 'Player not found' }, 404)
    } 

    const skyblockData = 'https://api.hypixel.net/v2/skyblock/profile?profile=' + userUUID
    return fetch(skyblockData, {
        headers: {
            'API-Key': key
        }
    })
}