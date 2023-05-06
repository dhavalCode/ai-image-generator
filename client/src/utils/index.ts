import { promptList } from '../constant'

export const getSurprisePrompt = (prompt: string): string => {
    const randomIndex = Math.floor(Math.random() * promptList.length)
    const randomPrompt = promptList[randomIndex]

    if (randomPrompt === prompt) return getSurprisePrompt(prompt)

    return randomPrompt
}

interface Identifiable {
    _id: number | string
}

export const removeDuplicatesById = <T extends Identifiable>(arr: T[]): T[] => {
    return Object.values(
        arr.reduce((acc, current) => {
            acc[current._id] = current
            return acc
        }, {} as Record<string | number, T>)
    )
}
