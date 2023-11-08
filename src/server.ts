import fastify from 'fastify'
import { knex } from './database'

const app = fastify()
const port = 3333

app.get('/', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

app.listen({ port }).then(() => {
  console.log(`HTTP Server Running on port ${port}`)
})
