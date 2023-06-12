import { useLocation } from "react-router-dom"
import { Story } from "src/types/story"

export default function Book() {
    const location = useLocation()
    const story: Story = location.state

    return (
        <div className="max-w-2xl mx-auto p-2">
            <div className="text-center my-4">
                <h1 className="font-bold uppercase">{story.title}</h1>
                <p className="font-light">{story.author}</p>
            </div>
            <div className="flex justify-center">
                <audio
                    controls
                    controlsList="nodownload"
                    src={`file://${story.audioPath}`}
                ></audio>
            </div>
            <div className="bg-white p-4 rounded-md my-4 text-justify outline outline-1">
                <p>{story.story}</p>
            </div>

            <div className="">
                <h1 className="text-center font-bold mt-10">Practice Words</h1>

                <div className="bg-white p-4 rounded my-4 outline outline-1">
                    {
                        story.specialWords.map((word, idx) => (
                            <div key={idx} className="text-center">
                                <h3>{word}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

