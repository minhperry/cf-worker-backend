import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { socialDataHandler } from './data/social-data'
import { getGithubCommits } from './data/github'
import { loginHandler } from './login/auth'
import { authMW } from './middleware/auth'
import { createHandler, listHandler } from './login/short'
import { serveDanhSach } from './data/danhsach'

type Binding =  {
    HYPIXEL: string    
    PASSWORD: string
    MYKEY: string
    shortener: KVNamespace
    GITHUB: string
    JWT_SIGNER: string
}

const app = new Hono<{Bindings: Binding}>()
app.use(
    '/*',
    cors()
)

app
    .get('/', (c) => c.html('<p>It worked!</p>'))
    .get('/socials', socialDataHandler)
    .get('/info', (c) => c.redirect('https://github.com/minhperry/cf-worker-backend'))
    .get('/commits', async (c) => getGithubCommits(c, 50))
    .get('/danhsach', (c) => serveDanhSach(c))

app.post('/auth/login', loginHandler)

app.use('/short', authMW)
    .post('/short', createHandler)
    .get('/short', listHandler)

export default app

/*
    
*/