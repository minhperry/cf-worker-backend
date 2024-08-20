import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { socialDataHandler } from './data/social-data'
import { skyblockXpHandler } from './skyblock/skyblock'
import { Md5 } from 'ts-md5'
import { verifyHash } from './login/md5'

type Binding =  {
    HYPIXEL: string    
    PASSWORD: string
}

const app = new Hono<{Bindings: Binding}>()
app.use(
    '/socials',
    cors()
)

app
    .get('/', (c) => c.html('<p>It worked!</p>'))
    .get('/socials', socialDataHandler)
    .get('/skyblock/xp/:name', skyblockXpHandler)
    .get('/info', (c) => c.json({ source: 'https://github.com/minhperry/cf-worker-backend' }))
    .get('/validate/:md5', (c) => verifyHash(c))

/* https://developers.cloudflare.com/workers/wrangler/configuration/#secrets
    https://hono.dev/docs/getting-started/cloudflare-workers
*/

export default app