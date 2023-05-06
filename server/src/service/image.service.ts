import { ImageInput, ImageOutput } from '../types/Image'
import Image from '../models/image.schema'

export const createImage = async (input: ImageInput): Promise<ImageOutput> => {
  const { imageUrl, prompt } = input

  const newImage = new Image({
    imageUrl,
    prompt,
  })
  
  return newImage.save() as Promise<ImageOutput>
}

export const findAllImages = async (
  limit: number,
  skip: number
): Promise<unknown[]> => {
  return Image.find().skip(skip).limit(limit).sort({ createdAt: -1 }).exec()
}