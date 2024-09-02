import socials from '../../data/socials.json';
import socialsAuth from '../../data/socials-auth.json'
import { Context } from 'hono';

type Entry = {
    name: string,
    url: string,
    logo: string,
    hidden?: boolean
}

export const socialDataHandler2 = (c: Context) => {
    const user = c.get('user')

    const whichData = (user !== undefined) ? socialsAuth : socials

    let retval: { [key: string]: Entry[] } = {}

    for (const cate of Object.keys(whichData)) {
        retval[cate] = whichData[cate]
            .filter((ea) => !ea.hidden)
            .map((ea: Entry) => ({
            name: ea.name,
            url: ea.url,
            logo: ea.logo,
        }))
    }

    return c.json(retval)
}
