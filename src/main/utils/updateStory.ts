import fs from 'fs'
import os from 'os'
import type { Story } from "../../types/story";
import { platform } from '@electron-toolkit/utils';

export function updateStory(newStory: Story, oldStories: Story[]) {
    const updatedStories = [...oldStories, newStory]

    // write the updated stories to json file
    let mainPath = ''
    if (platform.isWindows) {
        mainPath = `${os.homedir()}\Music\audiobook-data\data`
    } else {
        mainPath = `${os.homedir()}/Music/audiobook-data/data`
    }
    const updatedData = { stories: updatedStories }
    fs.writeFileSync(`${mainPath}/data.json`, JSON.stringify(updatedData))
    
    return updatedStories
}
