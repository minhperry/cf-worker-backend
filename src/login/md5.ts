import { Context } from "hono";
import { Md5 } from "ts-md5";

export function verifyHash(c: Context) {
    const password = c.env.PASSWORD
    const hash = Md5.hashStr(password)

    const userMd5 = c.req.param('md5')
    
    return c.json({ valid: hash == userMd5 })
}