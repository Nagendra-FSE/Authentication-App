import {Routes, Route} from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/email/verify/:code" element={<VerifyEmail />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} /> 
      </Routes>
  )
}

export default App
