import React, { useState } from 'react'
import HTMLInput from 'react-input-with-html'
import 'react-input-with-html/dist/index.css'
import './style.css'

const App = () => {
  const [inputHero, setInputHero] = useState('')
  const [inputNav, setInputNav] = useState('')
  const [highlightThis, setHighlightThis] = useState<string | boolean>('')

  const handleSubmit = () => {
    // submit your own input places
    alert(`You just called submit can have this in state: ${inputHero}`)
  }

  const modifierArr = [
    {
      regexMatch: /\+/g,
      htmlMod: `<span style="color: #a3a3a3">+</span>`
    }
  ]

  const hexDotHero = {
    enable: true,
    fontSize: 24
  }

  const hexDotNav = {
    enable: true,
    fontSize: 11
  }

  return (
    <>
      <h1 className={'title'}>Hero Search From Stocksy</h1>
      <HTMLInput
        id='input'
        value={inputHero}
        onChange={setInputHero}
        onSubmit={handleSubmit}
        modifierArr={modifierArr}
        spellCheck={false}
        hexDot={hexDotHero}
        highlightThis={highlightThis}
      />

      <div style={{ textAlign: 'center', margin: 12 }}>
        <button
          onClick={() => setInputHero('#E33CC7')}
          onMouseEnter={() => setHighlightThis('#E33CC7')}
          onMouseLeave={() => setHighlightThis('')}
        >
          #E33CC7
        </button>
      </div>

      <div style={{ textAlign: 'center', margin: 12 }}>
        <button
          onClick={() => setInputHero('*')}
          onMouseEnter={() => setHighlightThis('*')}
          onMouseLeave={() => setHighlightThis('')}
        >
          *
        </button>
      </div>

      <div style={{ textAlign: 'center', margin: 12 }}>
        <button
          onClick={() => setInputHero('')}
          onMouseEnter={() => setHighlightThis(true)}
          onMouseLeave={() => setHighlightThis('')}
        >
          Delete
        </button>
      </div>

      <h1 className={'title'}>Nav Search From Stocksy</h1>
      <HTMLInput
        id='input-nav'
        value={inputNav}
        onChange={setInputNav}
        onSubmit={handleSubmit}
        modifierArr={modifierArr}
        spellCheck={false}
        hexDot={hexDotNav}
      />
    </>
  )
}

export default App
