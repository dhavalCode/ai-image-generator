import { promptList } from '../constant'

export const getSurprisePrompt = (prompt: string): string => {
    const randomIndex = Math.floor(Math.random() * promptList.length)
    const randomPrompt = promptList[randomIndex]

    if (randomPrompt === prompt) return getSurprisePrompt(prompt)

    return randomPrompt
}
