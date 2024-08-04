# Cloudflare Worker Backend
Backend repo for [backend.minhperry.workers.dev](https://backend.minhperry.workers.dev)

# Installation

Just clone this repo

# Developement

For developement, create .dev.vars with key `HYPIXEL_API`:
```py
HYPIXEL_API="your-hypixel-api-key-here"
```

# Deploy

Deploy with `npx wrangler secret put HYPIXEL_API` and follow the instructions. Refer to [this guide](https://developers.cloudflare.com/workers/configuration/secrets/#adding-secrets-to-your-project) 