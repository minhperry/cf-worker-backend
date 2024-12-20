import socials from '../../json-data/socials.json';
import socialsAuth from '../../json-data/socials-auth.json'
import { Context } from 'hono';
import { getUserField } from '../utils/jwt';

type Entry = {
    name: string,
    url: string,
    logo: string,
    hidden?: boolean
}

export const socialDataHandler2 = (c: Context) => {
    const user = getUserField(c)

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
