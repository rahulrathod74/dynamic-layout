import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import DynamicLayout from './DynamicLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DynamicLayout/>
    </>
  )
}

export default App
