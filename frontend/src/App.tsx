
import React, { Suspense } from "react";
import {Routes, Route} from "react-router-dom";
import './App.css'
import Home  from "./pages/Home";

const Login = React.lazy(() => import("./pages/Login"))
const  Signup = React.lazy(() => import("./pages/Signup"))
const  Dashboard = React.lazy(() => import("./pages/Dashboard"))
const VerifyEmail = React.lazy(() => import("./pages/VerifyEmail"))
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"))
const ResetPassword = React.lazy(() => import( "./pages/ResetPassword"))

function App() {

 return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/register"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Signup />
          </Suspense>
        }
      />

      <Route
        path="/email/verify/:code"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <VerifyEmail />
          </Suspense>
        }
      />

      <Route
        path="/forgot/password"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <ForgotPassword />
          </Suspense>
        }
      />

      <Route
        path="/password/reset"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <ResetPassword />
          </Suspense>
        }
      />
       <Route
        path="/dashboard"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );

}

export default App
