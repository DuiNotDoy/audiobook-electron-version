import AddBookModal from './components/AddBookModal'
import Topbar from './components/Topbar'
import BookList from './components/Booklist'

export default function App(): JSX.Element {

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
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => updateStory()}>update</button>
            <BookList />
        </div>
    )
}
