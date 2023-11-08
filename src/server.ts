import fastify from 'fastify'

const app = fastify()
const port = 3333

app.get('/', () => {
  return 'My first Api with Fastify and Node'
})

app.listen({ port }).then(() => {
  console.log(`HTTP Server Running on port ${port}`)
})
