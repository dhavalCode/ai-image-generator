import axios from "../utils/axios";

const generateImage = (data: { prompt: string; size: string }) =>
    axios.post('/image/generate', data).then(
        (response) => response,
        (error) => error
    )

const imageService = {
    generateImage,
}

export default imageService
