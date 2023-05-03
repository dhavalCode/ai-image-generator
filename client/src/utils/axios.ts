import axiosLib from 'axios'

// axios Setup

const baseURL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/api'
    : '/api'

const axios = axiosLib.create({
    baseURL,
})

export default axios
