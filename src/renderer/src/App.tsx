import AddBookModal from './components/AddBookModal'
import Topbar from './components/Topbar'
import BookList from './components/Booklist'

export default function App(): JSX.Element {

    return (
        <div>
            <Topbar />
            <AddBookModal />
            <BookList />
        </div>
    )
}
