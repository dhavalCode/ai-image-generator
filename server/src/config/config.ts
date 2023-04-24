import EnvConfig from '../types/EnvConfig'
import Joi from 'joi'
import { config as cfg } from 'dotenv'
import path from 'path'
import { Configuration, OpenAIApi } from 'openai';
import { v2 as cloudinarySetup } from 'cloudinary';


cfg({ path: path.join(__dirname, '../../.env') })


const envVarsSchema = Joi.object()
    .keys({
        MONGODB_URL: Joi.string().required().messages({ 'any.required': 'Provide Mongodb Url.' }),
        OPEN_AI_KEY: Joi.string().required().messages({ 'any.required': 'Provide OpenAI key.' }),
        CLOUDINARY_CLOUD_NAME: Joi.string().required().messages({ 'any.required': 'Provide cloudinary cloud name.' }),
        CLOUDINARY_API_KEY: Joi.string().required().messages({ 'any.required': 'Provide cloudinary api key.' }),
        CLOUDINARY_API_SECRET: Joi.string().required().messages({ 'any.required': 'Provide cloudinary api secret.' }),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)

if (error) {
    throw new Error(`### ENV Setup Error ####\n ${error.message}`)
}


export const config: EnvConfig = {
    databaseUrl: envVars.MONGODB_URL,
    openAiKey: envVars.OPEN_AI_KEY,
    cloudinary: {
        name: envVars.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.CLOUDINARY_API_KEY,
        apiSecret: envVars.CLOUDINARY_API_SECRET
    }
}

export const validateEnv = (): void => {
    const { error } = envVarsSchema
        .prefs({ errors: { label: 'key' } })
        .validate(process.env)

    if (error) {
        throw new Error(`### ENV Setup Error ####\n ${error.message}`)
    }
}

// Open AI Setup

const configuration = new Configuration({
    apiKey: config.openAiKey,
});

export const openai = new OpenAIApi(configuration);

// Cloudinary Setup

cloudinarySetup.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

export const cloudinary = cloudinarySetup