import * as process from "node:process";

export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET
  },
  database: {
    name: process.env.DATABASE_NAME,
    user: process.env.DABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST
  }
})