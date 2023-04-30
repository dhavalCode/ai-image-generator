import { useState } from 'react'
import Header from '../components/Header'
import SizeSelector from '../components/SizeSelector'
import Explore from '../components/sections/Explore'
import { IMAGE_SIZES } from '../constant'
import { getSurprisePrompt } from '../utils'
import imageService from '../services/image.service'

function Home() {
    const [sizeValue, setSizeValue] = useState(IMAGE_SIZES[0].value)
    const [prompt, setPrompt] = useState('')

    const generateImage = async () => {
        const res = await imageService.generateImage({
            prompt,
            size: sizeValue,
        })
        console.log('Response :', res)
    }

    return (
        <>
            <Header />
            <div className="container mx-auto min-h-screen">
                <h1 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-black">
                    Text to image with AI Image Generator
                </h1>
                <div className="mb-6 flex items-stretch">
                    <input
                        type="text"
                        value={prompt}
                        id="large-input"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <SizeSelector
                        value={sizeValue}
                        onValueChange={(value) => {
                            setSizeValue(value)
                        }}
                    />

                    <button
                        type="button"
                        onClick={generateImage}
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Generate
                    </button>
                </div>
                <div>
                    <h2>No Inspiration ? </h2>
                    <button
                        className="btn btn-sm"
                        onClick={() => {
                            setPrompt(getSurprisePrompt(prompt))
                        }}
                    >
                        Surprize Me
                    </button>
                </div>
            </div>
            <Explore />
        </>
    )
}

export default Home
