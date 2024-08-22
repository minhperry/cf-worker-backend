import { Context } from "hono";
import { Md5 } from "ts-md5";

export function verifyHash(c: Context) {
    const password = c.env.PASSWORD
    const hash = Md5.hashStr(password)

    const userMd5 = c.req.param('md5')

    const myKey = c.env.MYKEY
    if (userMd5 === Md5.hashStr(myKey)) {
        return c.json({ is: 'admin' })
    }
    
    return c.json({ is: (hash === userMd5 ? 'recruiter' : 'none') })
}