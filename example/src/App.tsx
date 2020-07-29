import React, { useState } from 'react'
import HTMLInput from 'react-input-with-html'
import './style.css'

const App = () => {
  const [input, setInput] = useState('')

  const dynamicHexMod = (value: string) => {
    return `<span style="position: absolute; background-color: ${value}; height: 24px; width: 24px; top: 22px; border-radius: 50px;"></span><span style="padding-left: 32px">${value}</span>`
  }

  const modifierArr = [
    {
      regexMatch: /#[0-9A-F]{6}/gi,
      htmlModification: dynamicHexMod
    },
    {
      regexMatch: /\+/g,
      htmlModification: `<span style="color: #a3a3a3">+</span>`
    }
  ]

  return (
    <>
      <h1 className={'title'}>Search for your stuff</h1>
      <HTMLInput
        id='input'
        originalString={input}
        onChange={setInput}
        modifierArr={modifierArr}
      />
    </>
  )
}

export default App