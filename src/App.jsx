import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Route from './Components/Routes/Route'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Route/>
      </BrowserRouter>
    </>
  )
}

export default App
