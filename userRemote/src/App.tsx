
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import User from './pages/User';
import type { UserType } from './types/userType.types';
import  {type MouseEvent, useCallback } from 'react';
import GridLight from './components/GridLights';
import Button from './components/Button';
  const user: UserType = {
      id: "dsafsfefae",
      email: "nag@gmao.com",
      verified: false
  }
function App() {

  const clickHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    console.log(e, "dsds")
  }, [])

      const fetchSuggestions = async (query: string) => {
          const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
          if(!response.ok) {
              throw new Error("response is not ok")
          }
          const data = await response.json()
          return data;
      }

  return (
      <BrowserRouter>
      <div className="app">
        <nav>
          <Link to="/">Home</Link> | <Link to="/user">Users</Link> |  <Link to="/gridlights">Grid Lights</Link> | <Button onClick={clickHandler}>Button</Button>
        </nav>
        <Routes>
          <Route path="/" element={<h1>User remote (dev)</h1>} />
          <Route path="/user" element={<User user={user} />} />
          <Route path="/gridlights" element={<GridLight title="Grid Light" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
