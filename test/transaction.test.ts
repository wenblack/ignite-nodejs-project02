import { afterAll, beforeAll, it, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transaction Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('User can create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Cartão de Crédito',
        amount: 1500,
        type: 'debit',
      })
      .expect(201)
  })
})
