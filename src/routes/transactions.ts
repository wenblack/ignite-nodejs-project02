import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { CheckSessionIdExists } from '../middlewares/check-session-id'

export async function transactionRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [CheckSessionIdExists],
    },
    async (req) => {
      const sessionId = req.cookies.sessionId

      const transactions = await knex('transactions').where(
        'session_id',
        sessionId,
      )
      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [CheckSessionIdExists],
    },
    async (req) => {
      const sessionId = req.cookies.sessionId
      const transactionParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = transactionParamsSchema.parse(req.params)
      const transaction = await knex('transactions')
        .where('session_id', sessionId)
        .andWhere('id', id)
        .first()
      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [CheckSessionIdExists],
    },
    async (req) => {
      const sessionId = req.cookies.sessionId
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()
      return { summary }
    },
  )

  app.post('/', async (req, res) => {
    const transactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { title, amount, type } = transactionBodySchema.parse(req.body)

    // eslint-disable-next-line prefer-const
    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // One week
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}
