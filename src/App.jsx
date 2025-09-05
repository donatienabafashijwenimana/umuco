import { useState } from 'react'
import './App.css'
import Homepage from './homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full">
       <Homepage/>
    </div>
  )
}

export default App
