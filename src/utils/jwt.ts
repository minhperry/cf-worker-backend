import { SignJWT } from "jose"
import { Context } from 'hono';


export const genJWT = async (role: string, key: string) => {
    return await new SignJWT({ role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer('minhperry')
        .setAudience('minhperry')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(key))
}

export const getField = (context: Context, key: string) => {
    const field = context.get(key)
    if (field === undefined) return undefined
    else return field
}

export const getUserField = (context: Context) => getField(context, 'user')
