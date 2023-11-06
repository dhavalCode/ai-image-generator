import axiosLib from 'axios'

// axios Setup

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const baseURL = process.env.REACT_APP_API_HOST_URL!

const axios = axiosLib.create({
    baseURL: `${baseURL}/api`,
})

export default axios
