import mongoose from 'mongoose'
import { config } from './config'

// mongodb connection

export const dbConnect = (): void => {
  mongoose
    .connect(config.databaseUrl, {})
    .then(() => console.log(`Database Connected Successfully`))
    .catch((err) => {
      console.log('Database Connection error => ', err)
      process.exit(1)
    })
}
