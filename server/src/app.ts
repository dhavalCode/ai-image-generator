import express, { Application } from 'express'
import cors from 'cors'
// config
import { validateEnv } from './config/config'
import dbConnect from './config/dbConnect'
// routes
import { imageRouter } from './routes/image.route'

export const app: Application = express()

const port = 8080

// checking environment variables 
validateEnv();

// establish db connection
dbConnect()

app.disable('x-powered-by')

app.use(express.json())

app.use(express.static('public'))

app.use(cors())

app.use("/api/image", imageRouter)

// app.use(errorHandler)

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
})
