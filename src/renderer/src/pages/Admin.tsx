import AddBookModal from '../components/AddBookModal'
import BookList from '../components/Booklist'

export default function Admin() {

    function deleteAll() {
        console.log('inside delete')
        window.electron.ipcRenderer.send('data:post', { type: 'drop' })
        window.electron.ipcRenderer.on('post:response', (e, values) => {
            console.log({ e })
            console.log({ values })
            window.location.reload()
        })
    }

    return (
        <div>
            <button className='bg-red-400 px-2 py-1 rounded' onClick={() => deleteAll()} >Delete all stories</button>
            <AddBookModal />
            <BookList />
        </div>
    )
}
