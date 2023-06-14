import { useContext } from 'react'
import AddBookModal from '../components/AddBookModal'
import BookList from '../components/Booklist'
import { BooksContext } from '@renderer/BooksContext'

export default function Admin() {
    const {setTriggerRefetchCounter} = useContext(BooksContext)

    function deleteAll() {
        const choice = confirm(`All stories will be deleted. All data relating to every story 
        will also be deleted. This action cannot be undone!
                        Do you want to continue?`)

        if (choice) {
            window.electron.ipcRenderer.send('data:post', { type: 'drop' })
            window.electron.ipcRenderer.on('post:response', (e, values) => {
                console.log({ e })
                console.log({ values })
                setTriggerRefetchCounter((current: number) => current + 1)
            })
        }
    }

    return (
        <div>
            <button className='bg-red-400 px-2 py-1 rounded' onClick={() => deleteAll()} >Delete all stories</button>
            <AddBookModal />
            <BookList />
        </div>
    )
}
