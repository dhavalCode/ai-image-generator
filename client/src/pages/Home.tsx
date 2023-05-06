import { useState } from 'react'
import Header from '../components/Header'
import SizeSelector from '../components/SizeSelector'
import Explore from '../components/Explore'
import { IMAGE_SIZES } from '../constant'
import { getSurprisePrompt } from '../utils'
import imageService from '../services/image.service'
import ImageModal from '../components/ImageModal'
import { ImageModalState } from '../types/types'
import classNames from 'classnames'
import ErrorModal from '../components/ErrorModal'

// ------------------------------------------------------------

function Home() {
    const [sizeValue, setSizeValue] = useState(IMAGE_SIZES[0].value)

    const [IsGenerating, setIsGenerating] = useState(false)

    const [imageModalState, setImageModalState] = useState<ImageModalState>({
        imgSrc: null,
        open: false,
        prompt: '',
    })
    const [errorModelOpen, setErrorModelOpen] = useState(false)

    const [prompt, setPrompt] = useState('')

    const generateImage = async () => {
        try {
            setIsGenerating(true)
            const res = await imageService.generateImage({
                prompt,
                size: sizeValue,
            })

            setIsGenerating(false)

            if (res.status === 201 || res.status === 200) {
                const imageUrl = res?.data?.data?.imageUrl

                setImageModalState((pre) => ({
                    ...pre,
                    imgSrc: imageUrl,
                    open: true,
                    prompt: prompt,
                }))
            } else {
                setErrorModelOpen(true)
            }
        } catch (error) {
            setErrorModelOpen(true)
        }
    }

    return (
        <>
            <Header />
            <div className="container mx-auto max-w-screen-xl px-2">
                <h1 className="mt-16 pb-7 sm:mt-20 animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl sm:7xl font-black">
                    Text to image with AI Image Generator
                </h1>
                <p className="text-center">
                    Unlock your imagination with our platform and witness the
                    breathtaking power of computer-generated imagery!
                </p>
                <div className="max-w-screen-xl mt-10 mx-auto">
                    <div className="mb-6 flex space-y-5 flex-col sm:flex-row sm:items-baseline sm:space-x-5">
                        <div className="flex w-full row space-x-2 items-center">
                            <input
                                type="text"
                                value={prompt}
                                placeholder="Describe What you want the AI draw"
                                onChange={(e) => setPrompt(e.target.value)}
                                className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                            />

                            <SizeSelector
                                value={sizeValue}
                                onValueChange={(value) => {
                                    setSizeValue(value)
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={generateImage}
                            className={classNames(
                                'text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                                { 'btn-disabled': prompt === '' },
                                { loading: IsGenerating }
                            )}
                        >
                            {IsGenerating ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                    <div className="pl-1">
                        <h2 className="inline-block mr-2 font-bold text-sm sm:text-base">
                            No Inspiration ? Try &rArr;
                        </h2>
                        <button
                            className="btn btn-xs sm:btn-sm btn-outline capitalize"
                            onClick={() => {
                                setPrompt(getSurprisePrompt(prompt))
                            }}
                        >
                            Surprize Me
                        </button>
                    </div>
                </div>
            </div>
            <Explore setImageModalState={setImageModalState} />

            {/* footer spacer  */}
            <div className="mb-16"></div>

            {/* Modal  */}

            <ImageModal
                dialogState={imageModalState}
                setDialogState={setImageModalState}
            />
            <ErrorModal open={errorModelOpen} setIsOpen={setErrorModelOpen} />
        </>
    )
}

export default Home
