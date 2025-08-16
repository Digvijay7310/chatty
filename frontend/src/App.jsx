import React, {useContext} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import {Toaster} from 'react-hot-toast'
import { AuthContext } from "../context/AuthContext"
import ChatLoading from "./components/ChatLoading"

function App() {
  const {authUser, loading} = useContext(AuthContext)
  if(loading) return <div className="flex justify-center items-center h-screen w-full">
    <ChatLoading/>
  </div>
  return (
    <div className="bg-[url('./src/assets/bg_image.jpg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ?  <LoginPage/> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ?<ProfilePage/> : <Navigate to="/login"/>} />

      </Routes>
    </div>
  )
}

export default App
