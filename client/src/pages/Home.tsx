import { useState } from 'react'
import Header from '../components/Header'
import SizeSelector from '../components/SizeSelector'
import Explore from '../components/sections/Explore'
import { IMAGE_SIZES, dummyImages } from '../constant'
import { getSurprisePrompt } from '../utils'
import imageService from '../services/image.service'
import ImageModal from '../components/ImageModal'
import { ImageModalState } from '../components/types'
import classNames from 'classnames'

function Home() {
    const [sizeValue, setSizeValue] = useState(IMAGE_SIZES[0].value)
    const [IsGenerating, setIsGenerating] = useState(false)
    const [imageModalState, setImageModalState] = useState<ImageModalState>({
        imgSrc: null,
        open: false,
        prompt: '',
    })
    const [prompt, setPrompt] = useState('')

    const generateImage = async () => {
        setIsGenerating(true)
        const res = await imageService.generateImage({
            prompt,
            size: sizeValue,
        })
        if (res.status === 201 || res.status === 200) {
            const imageUrl = res?.data?.data?.imageUrl

            setImageModalState((pre) => ({
                ...pre,
                imgSrc: imageUrl,
                open: true,
                prompt: prompt,
            }))
        }
        setIsGenerating(false)
    }

    return (
        <>
            <Header />
            <div className="container mx-auto max-w-screen-xl">
                <h1 className="mt-24 pb-7 animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-6xl font-black">
                    Text to image with AI Image Generator
                </h1>
                <p className="text-center">
                    Unlock your imagination with our platform and witness the
                    breathtaking power of computer-generated imagery!
                </p>
                <div className="max-w-screen-xl mt-10 mx-auto">
                    <div className="mb-6 flex items-center space-x-7">
                        <input
                            type="text"
                            value={prompt}
                            placeholder="Describe What you want the AI draw"
                            onChange={(e) => setPrompt(e.target.value)}
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
                            className={classNames(
                                'text-white btn capitalize bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
                                { 'btn-disabled': prompt === '' },
                                { loading: IsGenerating }
                            )}
                        >
                            {IsGenerating ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                    <div>
                        <h2 className="inline-block font-bold mr-2">
                            No Inspiration ? Try &rArr;
                        </h2>
                        <button
                            className="btn btn-sm btn-outline capitalize"
                            onClick={() => {
                                setPrompt(getSurprisePrompt(prompt))
                            }}
                        >
                            Surprize Me
                        </button>
                    </div>
                </div>
            </div>
            <Explore
                images={dummyImages}
                setImageModalState={setImageModalState}
            />
            <ImageModal
                dialogState={imageModalState}
                setDialogState={setImageModalState}
            />
        </>
    )
}

export default Home
