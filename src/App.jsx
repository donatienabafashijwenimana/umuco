import { useState } from 'react'
import './App.css'
import Homepage from './homepage'
import MyCultureDashboard from './pages/amateka'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full">
       <Homepage/>
    </div>
  )
}

export default App
