import { SignJWT } from "jose"


export const genJWT = async (role: string, key: string) => {
    return await new SignJWT({ role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer('minhperry')
        .setAudience('minhperry')
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(key))
}