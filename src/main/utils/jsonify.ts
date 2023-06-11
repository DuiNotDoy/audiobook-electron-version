import fs from 'fs'
import { createMainPathIfNotExists } from './createPath'
import type { Story } from '../../types/story'

export function jsonifiedData(): { stories: Story[] } {
    const mainPath = createMainPathIfNotExists()
    const mainData = fs.readFileSync(`${mainPath}/data/data.json`, { encoding: 'utf8' })
    return JSON.parse(mainData)
}
