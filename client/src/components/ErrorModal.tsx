import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import errorImg from '../assets/error_500.jpg'

// ------------------------------------------------------------

interface ErrorModalProps {
    open: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, setIsOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('click', handleClickOutside)
        } else {
            document.body.style.overflow = 'unset'
            document.removeEventListener('click', handleClickOutside)
        }

        return () => {
            document.body.style.overflow = 'unset'
            document.removeEventListener('click', handleClickOutside)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div
                className={classNames('modal', 'backdrop-blur-sm', {
                    'modal-open': open,
                })}
            >
                <div className="modal-box relative" ref={modalRef}>
                    <label
                        className="absolute btn-ghost btn-circle btn btn-sm text-lg btn-primary right-3 top-3 hover:scale-105 transition-all duration-150"
                        onClick={handleClose}
                    >
                        ✕
                    </label>

                    <div className="overflow-y-auto">
                        <div className="mt-7 w-full flex justify-center">
                            <img
                                className="rounded-xl max-h-96"
                                src={errorImg}
                                alt={'Internal Server Error'}
                            />
                        </div>
                        <p className="mb-7 mt-4 text-center text-base">
                            We are currently experiencing high demand for image
                            generation service, and as a result, we may be
                            unable to process your request at this time. Please
                            try again later.
                        </p>
                    </div>

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn gap-2 capitalize"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorModal
