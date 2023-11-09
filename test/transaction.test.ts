import { afterAll, beforeAll, it, describe, expect } from 'vitest'
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
        type: 'credit',
      })
      .expect(201)
  })

  it('User should be able to list all transactions', async () => {
    const createdTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Cartão de Crédito',
        amount: 1500,
        type: 'credit',
      })
    const cookies = createdTransaction.get(`Set-Cookie`)

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Cartão de Crédito',
        amount: 1500,
      }),
    ])
  })
})
