import axiosLib from 'axios'

// axios Setup

const hostName = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : window.location.host

const axios = axiosLib.create({
    baseURL: `${hostName}/api`,
})

export default axios
