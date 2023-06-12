import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Story } from '../../../types/story'

export default function BookList() {
    const [stories, setstories] = useState<Story[]>([])

    useEffect(() => {
        getStories()
    }, [])

    function getStories() {
        window.electron.ipcRenderer.send('data:request', { type: 'all' })
        window.electron.ipcRenderer.on('request:response:all', (e, values) => {
            console.log({ e })
            console.log({ values })
            setstories(values.data)
        })
    }

    return (
        <div className="max-w-4xl p-2 mx-auto outline outline-1">
            <div className="flex gap-4 flex-wrap justify-center">
                {
                    stories.map(story => (
                        <Link to={`/book/${story.id}`} state={story} key={story.id} className="outline outline-1 p-1 rounded text-center w-44 hover:shadow-lg">
                            <img className="rounded h-48 w-full object-cover" src={`file://${story.thumbnailPath}`} />
                            <h1 className="text-lg">{story.title}</h1>
                            <p className="">{story.author}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
