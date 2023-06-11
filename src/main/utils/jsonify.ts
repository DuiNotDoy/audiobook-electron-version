import fs from 'fs'
import { createMainPathIfNotExists } from './createPath'

type Story = {
    id: string,
    title: string,
    author: string
}
export function jsonifiedData(): { stories: Story[] } {
    const mainPath = createMainPathIfNotExists()
    const mainData = fs.readFileSync(`${mainPath}/data/data.json`, { encoding: 'utf8' })
    return JSON.parse(mainData)
}
