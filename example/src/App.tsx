import React, { useState } from 'react'
import HTMLInput from 'react-input-with-html'
import './style.css'

const App = () => {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    // submit your own input places
    console.log('input on submit: ', input)
  }

  const dynamicHexMod = (value: string) => {
    return `<span style="position: absolute; background-color: ${value}; height: 24px; width: 24px; top: 20px; border-radius: 50px;"></span><span style="padding-left: 32px">${value}</span>`
  }

  const modifierArr = [
    {
      regexMatch: /#[0-9A-F]{6}/gi,
      htmlMod: dynamicHexMod
    },
    {
      regexMatch: /\+/g,
      htmlMod: `<span style="color: #a3a3a3">+</span>`
    }
  ]

  return (
    <>
      <h1 className={'title'}>Search for your stuff</h1>
      <HTMLInput
        id='input'
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        modifierArr={modifierArr}
        spellCheck={false}
      />
    </>
  )
}

export default App
