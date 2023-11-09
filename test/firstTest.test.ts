import { expect, test } from 'vitest'

test('User can create a transaction', () => {
  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})
