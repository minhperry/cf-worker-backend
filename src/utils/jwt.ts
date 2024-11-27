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

export type VariabledContext = Context<{
    Variables: {
        user: string
    }
}>

export const getUserField = (context: VariabledContext) => {
    const user = context.get('user' as any)
    if (user === undefined) return undefined
    else return user
}
