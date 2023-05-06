import { Document } from 'mongoose'

export type ImageInput = {
  prompt: string
  imageUrl: string
}

export interface ImageOutput extends Document {
  imageUrl: string
  prompt: string
  createdAt: Date
  updatedAt: Date
}
