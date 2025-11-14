import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  return (
    <div className="pt-16">
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
