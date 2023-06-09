
interface Story {
    id: string,
    title: string,
    author: string,
    story: string,
}

const stories: Story[] = [
    {
        id: 'id1',
        title: 'title-1',
        author: 'author-1',
        story: 'test story 1',
    }
]

export function getAllStory() {
    return stories
}

export function getStory(id: string) {
    return stories.find(story => story.id === id)
}

export function insertStory({ id, title, author, story }) {
    const newStory = {
        id,
        title,
        author,
        story
    }

    stories.push(newStory)
    return newStory
}
