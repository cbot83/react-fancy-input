import React, { useState } from 'react'
import HTMLInput from 'react-input-with-html'
import './style.css'

const App = () => {
  const [input, setInput] = useState('')

  return (
    <>
      <h1 className={'title'}>Search for your stuff</h1>
      <HTMLInput id='input' html={input} onChange={setInput} />
    </>
  )
}

export default App
