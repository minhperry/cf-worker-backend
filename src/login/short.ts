import { Context } from "hono";
import { getField } from '../utils/jwt';

class Shorts {
    private myKey: string
    private readonly _kv: KVNamespace

    constructor(private c: Context) {
        this.myKey = c.env.MYKEY
        this._kv = c.env.shortener
    }

    get kv() {
        return this._kv
    }

    async create() {
        try {
            const { key, value } = await this.c.req.json()

            if (!key) {
                return this.c.json({ error: 'Key is required' }, 400)
            }

            if (!value) {
                return this.c.json({ error: 'Value is required' }, 400)
            }

            const existing = await this.kv.get(key)
            if (existing !== null) {
                return this.c.json({ error: 'Key already exists' }, 409)
            }

            await this.kv.put(key, value)
            return this.c.json({ created: { [key]: value }}, 201)
        } catch (err) {
            console.error(err)
            console.trace(err)
            return this.c.json({ error: 'Internal Server Error' }, 500)
        }
    }

    async list() {
        try {
            const keyList = await this.kv.list()
            let retObj = []
            for (const key of keyList.keys) {
                retObj.push({
                    key: key.name,
                    url: await this.kv.get(key.name)
                })
            }
            return this.c.json({ result: retObj })
        } catch (err) {
            console.error(err)
            console.trace(err)
            return this.c.json({ error: 'Internal Server Error' }, 500)
        }
    }
}

export const listHandler = async (c: Context) => new Shorts(c).list()
export const createHandler = async (c: Context) => {
    const user = getField(c, 'user')
    if (user.role === 'admin' || user.role === 'recruiter') {
        return new Shorts(c).create()
    } else return c.json({ error: 'Unauthorized' }, 401)
}
