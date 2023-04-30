export interface ImageModalState {
    imgSrc: string | null
    open: boolean
    prompt: string
}

export type Image = {
    id: string
    prompt: string
    imageUrl: string
}
