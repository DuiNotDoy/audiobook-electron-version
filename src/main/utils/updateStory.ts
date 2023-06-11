import fs from 'fs'
import os from 'os'
import type { Story } from "../../types/story";

export function updateStory(newStory: Story, oldStories: Story[]) {
    const updatedStories = [...oldStories, newStory]

    // write the updated stories to json file
    const mainPath = `${os.homedir()}/Music/audiobook-data/data`
    const updatedData = { stories: updatedStories }
    fs.writeFileSync(`${mainPath}/data.json`, JSON.stringify(updatedData))
    
    return updatedStories
}
