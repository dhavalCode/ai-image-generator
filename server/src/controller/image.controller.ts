import { Request, Response } from 'express'
import { cloudinary, openai } from '../config/config'
import { createImage, findAllImages } from '../service/image.service'
import ResponseHandler from '../utils/responseHandler'
import { CreateImageRequestSizeEnum } from 'openai'

export const fetchAllImages = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = _req.query['page'] || 1

    const limit = _req.query['limit'] || 8

    const skip = Number(limit) * (Number(page) - 1)

    const images = await findAllImages(+limit, skip)

    ResponseHandler.success(res, images)
  } catch (error) {
    // console.log('Error :', error)
    ResponseHandler.serverError(res, error)
  }
}

export const generateImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt, size } = req.body

  if (!prompt || prompt === '') {
    ResponseHandler.badRequest(res, '', 'Prompt is required.')
  }

  let imageSize

  switch (size) {
    case 'Small':
      imageSize = CreateImageRequestSizeEnum._256x256
      break
    case 'Medium':
      imageSize = CreateImageRequestSizeEnum._512x512
      break
    case 'Large':
      imageSize = CreateImageRequestSizeEnum._1024x1024
      break

    default:
      imageSize = CreateImageRequestSizeEnum._256x256
      break
  }

  try {
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    })

    const image = aiResponse.data.data[0].url

    if (!image) {
      ResponseHandler.serverError(
        res,
        '',
        'Something went wrong while generating image'
      )
    }

    const uploadedImage = await cloudinary.uploader.upload(image || '')

    const imageUrl = uploadedImage.url.replace(/^http:/, 'https:')

    await createImage({
      imageUrl,
      prompt,
    })

    ResponseHandler.created(res, { imageUrl })
  } catch (error: unknown) {
    // console.log('Error :', error)
    ResponseHandler.serverError(res, error)
  }
}
