import { Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Book from './pages/Book'

export default function App(): JSX.Element {
    return (
        <>
            <Topbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/book/:id' element={<Book />} />
            </Routes>
        </>
    )
}
