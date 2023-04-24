type EnvConfig = {
    databaseUrl: string
    openAiKey: string
    cloudinary: {
        name: string
        apiKey: string
        apiSecret: string
    }
}


export default EnvConfig