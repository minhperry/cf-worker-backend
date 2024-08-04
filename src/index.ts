import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { socialDataHandler } from './data/social-data'
import { skyblockXpHandler } from './data/skyblock'

const corsHeaders = cors({
    origin: ['http://localhost:4200', 'https://minhperry.pages.dev/','https://skysim.pages.dev/'],
    allowMethods: ['GET', 'OPTIONS'],
})

const app = new Hono()
app.use(
    '/socials',
    cors()
)

app
    .get('/', (c) => c.html('<p>It worked!</p>'))
    .get('/socials', socialDataHandler)
    .get('/skyblock/xp/:name', skyblockXpHandler)

export default app