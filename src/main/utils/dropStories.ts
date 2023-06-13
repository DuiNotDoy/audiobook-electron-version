import fs from 'fs'
import os from 'os'

export function dropStories() {
    const mainPath = `${os.homedir()}/Music/audiobook-data`

    // drop all data
    fs.writeFileSync(`${mainPath}/data/data.json`, JSON.stringify({ stories: [] }))

    // drop all audio
    const audioFiles = fs.readdirSync(`${mainPath}/audios`, { encoding: 'utf8' })
    audioFiles.forEach(audio => {
        fs.rmSync(`${mainPath}/audios/${audio}`)
    })

    // drop all thumbnails
    const thumbnailFiles = fs.readdirSync(`${mainPath}/thumbnails`, { encoding: 'utf8' })
    thumbnailFiles.forEach(thumbnail => {
        fs.rmSync(`${mainPath}/thumbnails/${thumbnail}`)
    })
}
