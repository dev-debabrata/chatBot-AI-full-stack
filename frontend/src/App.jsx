import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Community from './pages/Community'
import ProBot from './pages/ProBot'

const App = () => {
  return (
    <>
      <div className=''>
        <div className=' flex h-screen w-screen'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<ChatBox />} />
            <Route path='/pro' element={<ProBot />} />
            <Route path='/community' element={<Community />} />
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App