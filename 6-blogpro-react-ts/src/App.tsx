import {useState} from "react"

function App() {
    const [value, toggle] = useState(false)
    const change = () => {
        toggle(true)
    }
  return (
    <>
      this is app{value}
    </>
  )
}

export default App
