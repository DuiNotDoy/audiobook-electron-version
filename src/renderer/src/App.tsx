import { useState } from 'react'
import AddBookModal from './components/AddBookModal'
import Topbar from './components/Topbar'

type Story = {
    id: string,
    title: string,
    author: string
}

export default function App(): JSX.Element {
    const [stories, setstories] = useState<Story[]>([])

    function getStories() {
        console.log('clicked')
        window.electron.ipcRenderer.send('data:request', { type: 'all' })
        window.electron.ipcRenderer.on('request:response', (e, data) => {
            console.log({ e })
            console.log(data)
        })
    }

    function getStory(id: string) {
        window.electron.ipcRenderer.send('data:request', { type: 'single', id: id })
        window.electron.ipcRenderer.on('request:response', (e, data) => {
            console.log({ e })
            console.log({ data })
        })
    }

    function insertStory() {
        const testData: Story = {
            id: 'id-6',
            title: 'title-6',
            author: 'author-6'
        }
        window.electron.ipcRenderer.send('data:post', { type: 'insert', data: testData })
        window.electron.ipcRenderer.on('post:response', (e, values) => {
            console.log({ e })
            console.log(values)
            if (!values.success) {
                alert('Story already exists')
                return
            }
            setstories(values.data)
        })
    }

    function updateStory() {
        window.electron.ipcRenderer.send('data:post', { type: 'update', data: 'another test' })
        window.electron.ipcRenderer.on('post:response', (e, data) => {
            console.log({ e })
            console.log(data)
        })
    }

    return (
        <div>
            <Topbar />
            <AddBookModal />
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => getStories()}>Get all story</button>
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => getStory('id1')}>Get story 1</button>
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => insertStory()}>Insert</button>
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => updateStory()}>update</button>
            <div>
                {
                    stories.map(story => (
                        <div key={story.id}>
                            <h1>{story.title}</h1>
                            <p>{story.author}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
