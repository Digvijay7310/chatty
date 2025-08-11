import React from "react"
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"

function App() {

  return (
    <div className="bg-[url('./src/assets/bg_image.jpg')] bg-contain">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />

      </Routes>
    </div>
  )
}

export default App
