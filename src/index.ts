import { AutoRouter, cors, IRequest } from 'itty-router' // ~1kB
import { getSocialData } from './data/social-data'

type Environment = { KV: KVNamespace }
type CFArgs = [Environment, ExecutionContext]

const { preflight, corsify } = cors({
  origin: '*',
  allowMethods: '*',
}) 
const router = AutoRouter<IRequest, CFArgs>({
  before: [preflight],
  finally: [corsify]
})

let isPublic = true

router
  .get('/socials', getSocialData)
  .get('/public', (req, env) => new Response(
    JSON.stringify({ publicMode: isPublic }), {
      headers: { 'Content-Type': 'application/json' },
  }))
  .get('*', () => new Response('Not found', { status: 404 }))

export default router