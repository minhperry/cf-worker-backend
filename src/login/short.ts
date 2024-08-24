import { Context } from "hono";
import { Md5 } from 'ts-md5';

export class Shorts {
    private myKey: string
    private _kv: KVNamespace
    private key: string | undefined

    constructor(private c: Context) {
        this.myKey = c.env.MYKEY
        this._kv = c.env.shortener
        this.key = c.req.header('X-Longass-Api-Header-Name')
    }

    get kv() {
        return this._kv
    }

    auth(): boolean {
        if (this.key?.split('_')[1] == Md5.hashStr(this.myKey)) {
            return false
        }
        return true
    }

    async create() {
        if (this.auth()) {
            return this.c.json({ error: 'Unauthorized' }, 401)
        }

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
        if (this.auth()) {
            return this.c.json({ error: 'Unauthorized' }, 401)
        }

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
