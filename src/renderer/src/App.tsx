import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { Story } from 'src/types/story'
import Topbar from './components/Topbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Book from './pages/Book'
import { BooksContext } from './BooksContext'

export default function App(): JSX.Element {
    const [stories, setStories] = useState<Story[]>([])
    const [triggerRefetchCounter, setTriggerRefetchCounter] = useState(0)

    useEffect(() => {
        getStories()
    }, [triggerRefetchCounter])

    function getStories() {
        window.electron.ipcRenderer.send('data:request', { type: 'all' })
        window.electron.ipcRenderer.on('request:response:all', (e, values) => {
            console.log('event in app: ', e)
            setStories(values.data)
        })
    }

    return (
        <BooksContext.Provider value={{ stories, setStories, setTriggerRefetchCounter }}>
            <Topbar />
            <Routes>
            <Route path='*' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/book/:id' element={<Book />} />
            </Routes>
        </BooksContext.Provider>
    )
}
