import fs from 'fs'
import os from 'os'

export function createMainPathIfNotExists(): string {
    const home = os.homedir()
    const mainPath = `${home}/Music/audiobook-data`

    // Create main folder for app data if it does not exists
    if (!fs.existsSync(mainPath)) {
        fs.mkdirSync(mainPath)
    }

    // Create subfolder for audios if it does not exist
    if (!fs.existsSync(`${mainPath}/audios`)) {
        fs.mkdirSync(`${mainPath}/audios`)
    }

    // Create subfolder for thumbnails if it does not exist
    if (!fs.existsSync(`${mainPath}/thumbnails`)) {
        fs.mkdirSync(`${mainPath}/thumbnails`)
    }

    // Create subfolder for main data if it does not exists
    if (!fs.existsSync(`${mainPath}/data`)) {
        fs.mkdirSync(`${mainPath}/data`)
    }

    return mainPath
}
