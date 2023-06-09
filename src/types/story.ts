
export type Story = {
    id?: string,
    title: string,
    author: string,
    story: string,
    audioPath: string,
    thumbnailPath: string,
    specialWords: SpecialWordsEntry[]
}

export type SpecialWordsEntry = { word: string, path: string }
