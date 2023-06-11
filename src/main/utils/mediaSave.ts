import fs from 'fs'
import { createMainPathIfNotExists } from './createPath'

export function saveAudio(src: string, filename: string) {
    console.log('inside save audio')
    console.log({ src })
    const mainPath = createMainPathIfNotExists()
    const dest = `${mainPath}/audios/${filename}.mp3`
    fs.copyFileSync(src, dest)
    return dest
}

export function saveThumbnail(src: string, filename: string) {
    console.log('inside save thumbnail')
    console.log({ src })
    const mainPath = createMainPathIfNotExists()
    const dest = `${mainPath}/thumbnails/${filename}.jpeg`
    fs.copyFileSync(src, dest)
    return dest
}
