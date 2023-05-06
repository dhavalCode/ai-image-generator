import React, { useState } from 'react'
import { IMAGE_SIZES } from '../constant'

//---------------------------------------------------------

interface SizeSelectorProps {
    value: string
    onValueChange: (value: string) => void
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
    value,
    onValueChange,
}) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => handleOpen()}
                    className="inline-flex w-full mt-0 justify-center gap-x-1.5 rounded-md bg-white px-3 py-[1.12rem] text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    {value}
                    <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={`${
                    open ? 'block' : 'hidden'
                } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-300`}
            >
                <ul className="py-1" role="none">
                    {IMAGE_SIZES.map((size) => (
                        <li
                            key={size.value}
                            className={`${
                                value === size.value
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700 '
                            } block px-4 py-2 text-sm cursor-pointer`}
                            onClick={() => {
                                onValueChange(size.value)
                                handleClose()
                            }}
                        >
                            {size.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SizeSelector
