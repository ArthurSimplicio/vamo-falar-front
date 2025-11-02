import { Route, Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import PrivateRoute from "./components/PrivateRoute"
import Chat from "./pages/Chat"
import ChatPage from "./pages/ChatPage"
import CreateRoom from "./pages/CreateRoom"
import Navbar from "./components/Navbar"
import Message from "./components/Message"

function App() {

  return (
    <>
        <Navbar />
        <Message />
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} 
          />
          <Route path="/createroom" element={
            <PrivateRoute>
              <CreateRoom />
            </PrivateRoute>} 
          />
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>} 
          />
          <Route path="/chat/:roomName" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>} 
          />
        </Routes>
    </>
  )
}

export default App
