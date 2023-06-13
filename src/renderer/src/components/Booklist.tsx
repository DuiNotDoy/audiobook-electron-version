import { useContext } from "react"
import { Link } from "react-router-dom"
import { BooksContext } from "@renderer/BooksContext"
import type { Story } from "src/types/story"

export default function BookList() {
    const { stories } = useContext(BooksContext)

    return (
        <div className="max-w-4xl p-2 mx-auto outline outline-1">
            <div className="flex gap-4 flex-wrap justify-center">
                {
                    stories.map((story: Story) => (
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
