import fs from 'fs'
import os from 'os'

export function dropStories() {
    const mainPath = `${os.homedir()}/Music/audiobook-data/data`
    fs.writeFileSync(`${mainPath}/data.json`, JSON.stringify({ stories: [] }))
}
