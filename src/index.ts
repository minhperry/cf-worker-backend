import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { socialDataHandler2 } from './data/social-data';
import { getGithubCommits } from './data/github'
import { loginHandler } from './login/auth'
import { authMW } from './middleware/auth'

type Binding =  {
    HYPIXEL: string
    PASSWORD: string
    MYKEY: string
    shortener: KVNamespace
    GITHUB: string
    JWT_SIGNER: string
}

type Variables = {
    user: string
}

const app = new Hono<{Bindings: Binding, Variables: Variables}>()
app.use(
    '/*',
    cors()
)

app
    .get('/', (c) => c.html('<p>It worked!</p>'))
    .get('/socials', (c) => c.json({message: 'Please migrate to /socials/v2'}, 404))
    .get('/info', (c) => c.redirect('https://github.com/minhperry/cf-worker-backend'))
    .get('/commits', async (c) => getGithubCommits(c, 50))
    //.get('/danhsach', (c) => serveDanhSach(c))

app.post('/auth/login', loginHandler)

app.use('/socials/v2', authMW)
    .get('/socials/v2', async (c) => socialDataHandler2(c))

// app.use('/short', authMW).post('/short', createHandler).get('/short', listHandler)
// app.use('/me', authMW).get('/me', personalHandler)

app.get('/*', (c) => c.json({error: 'Endpoint not found'}, 404))

export default app
