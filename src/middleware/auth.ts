import { Context, Next } from "hono";
import { jwtVerify } from "jose";

export const authMW = async (c: Context, next: Next) => {
    const header = c.req.header('Authorization')
    if (!header || !header.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = header.split(' ')[1]
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(c.env.JWT_SIGNER))
        c.set('user', payload)
        return next()
    } catch (e) {
        return c.json({ error: 'Invalid token' }, 401)
    }
}