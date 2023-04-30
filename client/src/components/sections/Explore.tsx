import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Image, ImageModalState } from '../types'

// ------------------------------------------------------------

interface ImageModalProps {
    images: Image[]
    setImageModalState: React.Dispatch<React.SetStateAction<ImageModalState>>
}

const Explore: React.FC<ImageModalProps> = ({ images, setImageModalState }) => {
    return (
        <div className="container mx-auto max-w-screen-xl mt-14">
            <div className="mb-5">
                <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl font-black">
                    Explore
                </h2>

                <p className="text-neutral-900">
                    Discover the endless possibilities of computer-generated
                    imagery
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="cursor-pointer hover:scale-105 transition-all duration-200"
                        onClick={(e) => {
                            e.stopPropagation()
                            setImageModalState((pre) => ({
                                ...pre,
                                open: true,
                                imgSrc: image.imageUrl,
                                prompt: image.prompt,
                            }))
                        }}
                    >
                        <img
                            key={image.id}
                            className="h-auto w-80 rounded-lg"
                            src={image.imageUrl}
                            alt={image.prompt}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Explore
