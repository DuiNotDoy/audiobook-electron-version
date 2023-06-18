import fs from 'fs'
import { createMainPathIfNotExists } from './createPath'
import { platform } from '@electron-toolkit/utils'

export function saveThumbnail(src: string, filename: string) {
    const mainPath = createMainPathIfNotExists()

    let dest: string = ''
    if (platform.isWindows) {
        dest = `${mainPath}\thumbnails\${filename}.jpeg`
    } else {
        dest = `${mainPath}/thumbnails/${filename}.jpeg`
    }
    fs.copyFileSync(src, dest)
    return dest
}
