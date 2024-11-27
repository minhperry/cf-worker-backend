import { Context } from "hono"
import { genJWT } from "../utils/jwt"

export const loginHandler = async (c: Context) => {
    let password;
    try {
        let { password } = await c.req.json()
    } catch (e) {
        return c.json({ error: 'Invalid payload' }, 400)
    }
    const { PASSWORD, MYKEY, JWT_SIGNER } = c.env

    if (password === PASSWORD) {
        const token = await genJWT('recruiter', JWT_SIGNER)
        return c.json({ token, role: 'recruiter' })
    } else if (password === MYKEY) {
        const token = await genJWT('admin', JWT_SIGNER)
        return c.json({ token, role: 'admin' })
    } else {
        return c.json({ error: 'Invalid password' }, 401)
    }
}
