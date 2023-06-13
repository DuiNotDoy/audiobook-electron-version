import { useRef, useState } from 'react'
import Loading from './Loader'
import type { Story } from 'src/types/story'

export default function AddBookModal(): JSX.Element {
    const [open, setopen] = useState(false)
    const [submitting, setsubmitting] = useState(false)
    const title = useRef<HTMLInputElement>(null)
    const author = useRef<HTMLInputElement>(null)
    const story = useRef<HTMLTextAreaElement>(null)
    const specialWords = useRef<HTMLInputElement>(null)
    const [audioFile, setaudioFile] = useState<File | null>(null)
    const [thumbNail, setthumbNail] = useState<File | null>(null)
    const [hasAudio, sethasAudio] = useState(false)
    const [hasImage, sethasImage] = useState(false)
    const [hasError, sethasError] = useState(false)

    function fileUpload(): void {
        setsubmitting(true)
        if (hasEmptyField()) {
            return handleError({ error: 'Empty Field', message: 'Do not leave an empty field' })
        }

        const storyData: Story = {
            title: title.current!.value,
            author: author.current!.value,
            story: story.current!.value,
            audioPath: audioFile!.path,
            thumbnailPath: thumbNail!.path,
            specialWords: specialWords.current!.value.split(',')
        }

        window.electron.ipcRenderer.send('data:post', { type: 'insert', data: storyData })
        window.electron.ipcRenderer.on('post:response', (e, values) => {
            console.log({ e })
            console.log(values)
            if (!values.success) {
                handleError({ error: 'Crashed', message: 'Error occurred while saving media' })
            }
            console.log(values.data)
            setsubmitting(false)
            window.location.reload()
        })
    }

    function setAudio(e: React.FormEvent): void {
        const target = e.target as HTMLInputElement
        if (!target.files) {
            return
        }
        setaudioFile(target.files[0])
        console.log(audioFile)
        sethasAudio(true)
    }

    function setCoverImage(e: React.FormEvent): void {
        const target = e.target as HTMLInputElement
        if (!target.files) {
            return
        }
        setthumbNail(target.files[0])
        console.log(thumbNail)
        sethasImage(true)
    }

    function hasEmptyField(): boolean {
        if (!title.current?.value || !author.current?.value || !story.current?.value || !audioFile || !thumbNail) {
            return true
        }
        return false
    }

    function handleError({ error, message }: { error: string; message: string }): void {
        setsubmitting(false)
        alert(`${error}: ${message}`)
    }

    return (
        <>
            {submitting && <Loading />}
            <div className="flex justify-end m-2">
                <button
                    className={
                        open ? 'bg-red-400 px-2 py-1 rounded' : 'bg-blue-400 px-2 py-1 rounded'
                    }
                    onClick={(): void => {
                        setopen(true)
                    }}
                >
                    Add Book
                </button>
            </div>

            {open && (
                <div className="absolute inset-0 grid place-items-center bg-gray-200/50">
                    <div className="outline outline-1 p-4 w-3/4 bg-gray-100 shadow-xl select-none rounded">
                        <div className="flex justify-end">
                            <button
                                className="bg-red-400 px-2 py-1 rounded"
                                onClick={(): void => {
                                    setopen(false)
                                }}
                            >
                                Close
                            </button>
                        </div>
                        <div className="mb-2">
                            <label className="block" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="outline outline-1 rounded w-full px-2"
                                ref={title}
                                onChange={(): void => sethasError(false)}
                                type="text"
                                name="title"
                                id="title"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block" htmlFor="author">
                                Author
                            </label>
                            <input
                                className="outline outline-1 rounded w-full px-2"
                                ref={author}
                                onChange={(): void => sethasError(false)}
                                type="text"
                                name="author"
                                id="author"
                            />
                        </div>

                        <div className="flex gap-2 mb-2 mt-4">
                            <label
                                className={
                                    hasAudio
                                        ? 'inline-block bg-green-400 px-2 py-1 rounded cursor-pointer hover:contrast-50'
                                        : 'inline-block bg-yellow-400 px-2 py-1 rounded cursor-pointer hover:contrast-50'
                                }
                                htmlFor="audiofile"
                            >
                                choose audiofile
                            </label>
                            <input
                                className="outline outline-1 rounded hidden"
                                onChange={(e: React.FormEvent): void => {
                                    sethasError(false)
                                    setAudio(e)
                                }}
                                type="file"
                                accept="audio/*"
                                name="audiofile"
                                id="audiofile"
                            />

                            <label
                                className={
                                    hasImage
                                        ? 'inline-block bg-green-400 px-2 py-1 rounded cursor-pointer hover:contrast-50'
                                        : 'inline-block bg-yellow-400 px-2 py-1 rounded cursor-pointer hover:contrast-50'
                                }
                                htmlFor="thumbnail"
                            >
                                choose thumbnail
                            </label>
                            <input
                                className="outline outline-1 rounded hidden"
                                onChange={(e: React.FormEvent): void => {
                                    sethasError(false)
                                    setCoverImage(e)
                                }}
                                type="file"
                                accept="image/*"
                                name="thumbnail"
                                id="thumbnail"
                            />
                        </div>

                        <div className="my-2">
                            <label className="block" htmlFor="words">
                                List of difficult words separated by comma (ex: word1, word2)
                            </label>
                            <input
                                className="outline outline-1 rounded w-full px-2"
                                ref={specialWords}
                                onChange={(): void => sethasError(false)}
                                type="text"
                                name="words"
                                id="words"
                            />
                        </div>

                        <div>
                            <label className="" htmlFor="story">
                                Story
                            </label>
                            <textarea
                                className="w-full p-2 outline outline-1 h-56"
                                ref={story}
                                onChange={(): void => sethasError(false)}
                                name="story"
                                id="story"
                            />
                        </div>

                        <div className="flex justify-center my-2">
                            <button
                                className="bg-blue-400 px-2 py-1 rounded"
                                onClick={(): void => fileUpload()}
                            >
                                Add Book
                            </button>
                        </div>
                        {hasError && (
                            <div>
                                <h3 className="text-center text-red-500">
                                    Don't leave empty fields!
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
