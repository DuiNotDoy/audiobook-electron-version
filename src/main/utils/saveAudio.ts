import fs from 'fs'
import { createMainPathIfNotExists } from './createPath'
import { platform } from '@electron-toolkit/utils'

export function saveAudio(src: string, filename: string) {
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
