import axios from '../utils/axios'

const generateImage = (data: { prompt: string; size: string }) =>
    axios.post('/image/generate', data).then(
        (response) => response,
        (error) => error
    )

const fetchImages = (page: number, limit = 8) =>
    axios.get(`/image/all?page=${page}&limit=${limit}`).then(
        (response) => response,
        (error) => error
    )

const imageService = {
    generateImage,
    fetchImages,
}

export default imageService
