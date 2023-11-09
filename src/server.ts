import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()
const port = env.PORT

app.get('/', async () => {
  const transaction = await knex('transactions').select('*')

  return transaction
})

app.listen({ port }).then(() => {
  console.log(`HTTP Server Running on port ${port}`)
})
