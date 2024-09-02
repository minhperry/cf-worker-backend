# Cloudflare Worker Backend
Backend repo for [backend.minhperry.workers.dev](https://backend.minhperry.workers.dev)

# Installation

Just clone this repo

# Developement

For development, create .dev.vars with key `YOUR_KEY_HERE`:
```js
YOUR_KEY_HERE="any-of-your.secret-key-here"
```

# Deploy

First, upload the secrets with `npx wrangler secret put YOUR_KEY_HERE` for each secret key you have and follow the instructions. Refer to [this guide](https://developers.cloudflare.com/workers/configuration/secrets/#adding-secrets-to-your-project).

Then, simply deploy with `npx wrangler deploy`.
