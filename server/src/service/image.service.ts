import { Image, PrismaClient } from '@prisma/client'
import { ImageInput } from '../types/Image'

const prisma = new PrismaClient()

export const createImage = async (input: ImageInput): Promise<Image> => {
  const { imageUrl, prompt } = input
  return prisma.image.create({
    data: {
      imageUrl,
      prompt,
    },
  })
}

export const findAllImages = async (
  limit: number,
  offset: number
): Promise<Image[]> => {
  return prisma.image.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}