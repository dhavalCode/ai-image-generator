import path from 'path'
import express, { Application } from 'express'
import cors from 'cors'
// config
import { validateEnv } from './config/config'
import { dbConnect } from './config/dbConnect'
// routes
import { imageRouter } from './routes/image.route'
// import { staticFileNames } from './config/staticFiles'

export const app: Application = express()

const port = 8080

// checking environment variables
validateEnv()

// establish db connection
dbConnect()

app.disable('x-powered-by')

app.use(express.json())

// app.use(express.static('public'))

app.use(cors())

if (process.env.NODE_ENV == 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
}

app.use('/api/image', imageRouter)

app.use('/health', (req, res) => res.json({ message: ' Server is running...' }))

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
