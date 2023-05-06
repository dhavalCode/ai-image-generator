export interface ImageModalState {
    imgSrc: string | null
    open: boolean
    prompt: string
}

export type Image = {
    _id: string
    prompt: string
    imageUrl: string
    createdAt : string
}
