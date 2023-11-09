import fastify from 'fastify'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = fastify()
const port = env.PORT

app.register(transactionRoutes, {
  prefix: 'transactions',
})

app.listen({ port }).then(() => {
  console.log(`HTTP Server Running on port ${port}`)
})
