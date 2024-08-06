import { Context } from "hono"
import { SkycryptAPI } from "./skycrypt.api"

class SkyblockAPI {
    private static context: Context

    constructor(context: Context, name: string) {
        SkyblockAPI.context = context
    }

    public static async getSkyblockData(uuid: string) {
        const key = SkyblockAPI.context.env.HYPIXEL
        const user = SkyblockAPI.context.req.param('name')

        const userUUID = await MojangAPI.getUserU(user)


    }

}