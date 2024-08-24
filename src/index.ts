import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { socialDataHandler } from './data/social-data'
import { skyblockXpHandler } from './skyblock/skyblock'
import { verifyHash } from './login/md5'
import { Shorts } from './login/short'

type Binding =  {
    HYPIXEL: string    
    PASSWORD: string
    MYKEY: string
    shortener: KVNamespace
}

const app = new Hono<{Bindings: Binding}>()
app.use(
    '/*',
    cors()
)



app
    .get('/', (c) => c.html('<p>It worked!</p>'))
    .get('/socials', socialDataHandler)
    .get('/skyblock/xp/:name', skyblockXpHandler)
    .get('/info', (c) => c.json({ source: 'https://github.com/minhperry/cf-worker-backend' }))
    .get('/validate/:md5', (c) => verifyHash(c))

app.post('/short', async (c) => new Shorts(c).create())

app.get('/short', async (c) => new Shorts(c).list())

export default app

/*
    
*/