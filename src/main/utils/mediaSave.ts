import fs from 'fs'
import { createMainPathIfNotExists } from './createPath'
import { platform } from '@electron-toolkit/utils'

export function saveAudio(src: string, filename: string) {
    console.log('inside save audio')
    console.log({ src })
    const mainPath = createMainPathIfNotExists()

    let dest: string = ''
    if (platform.isWindows) {
        dest = `${mainPath}\audios\${filename}.mp3`
    } else {
        dest = `${mainPath}/audios/${filename}.mp3`
    }
    fs.copyFileSync(src, dest)
    return dest
}

export function saveThumbnail(src: string, filename: string) {
    console.log('inside save thumbnail')
    console.log({ src })
    const mainPath = createMainPathIfNotExists()

    let dest: string = ''
    if (platform.isWindows) {
        dest = `${mainPath}\audios\${filename}.jpeg`
    } else {
        dest = `${mainPath}/audios/${filename}.jpeg`
    }
    fs.copyFileSync(src, dest)
    return dest
}
