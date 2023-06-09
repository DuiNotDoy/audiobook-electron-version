import AddBookModal from './components/AddBookModal'
import Topbar from './components/Topbar'

export default function App(): JSX.Element {

    function getStories() {
        console.log('clicked')
        window.electron.ipcRenderer.send('data:request', { filter: 'all' })
        window.electron.ipcRenderer.on('data:response', (e, data) => {
            console.log({ e })
            console.log(data)
        })
    }

    function getStory(id: string) {
        window.electron.ipcRenderer.send('data:request', { filter: 'single', id: id })
        window.electron.ipcRenderer.on('data:response', (e, data) => {
            console.log({ data })
        })
    }

    return (
        <div>
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => getStories()}>Get all story</button>
            <button className='bg-blue-400 px-2 py-1 rounded' onClick={(): void => getStory('id1')}>Get story 1</button>
            <Topbar />
            <AddBookModal />
        </div>
    )
}
