
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import User from './pages/User';
import type { UserType } from './types/userType.types';
  const user: UserType = {
      id: "dsafsfefae",
      email: "nag@gmao.com",
      verified: false
  }
function App() {



  return (
      <BrowserRouter>
      <div style={{ padding: 12 }}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/user">Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>User remote (dev)</h1>} />
          <Route path="/user" element={<User user={user} />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
