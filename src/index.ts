import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { socialDataHandler } from './data/social-data'
import { skyblockXpHandler } from './skyblock/skyblock'
import { debugger$ } from './skyblock/skycrypt'

type Binding =  {
    HYPIXEL: string    
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
    .get('/debug', debugger$)
/* https://developers.cloudflare.com/workers/wrangler/configuration/#secrets
    https://hono.dev/docs/getting-started/cloudflare-workers
*/

export default app