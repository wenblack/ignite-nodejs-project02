import { knex as knexCore } from 'knex'
export const knex = knexCore({
  client: 'sqlite',
  connection: {
    filename: './temp/app.db',
  },
})
