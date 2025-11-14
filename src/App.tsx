import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className="">
      <header className="">
        <Navbar />
      </header>
      <main className="">
        <Outlet />
      </main>
      <footer className="">
      </footer>
    </div>
  )
}

export default App
