import { Router } from 'express'
import {
  fetchAllImages, generateImage
} from '../controller/image.controller'

export const imageRouter = Router()

imageRouter.get('/all', fetchAllImages)

imageRouter.post('/generate', generateImage)
