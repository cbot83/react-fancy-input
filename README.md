# react-input-with-html

> A react input component that uses contenteditable on a div to display the input value with html cut in for that touch of fancy

[![NPM](https://img.shields.io/npm/v/react-input-with-html.svg)](https://www.npmjs.com/package/react-input-with-html) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-input-with-html
```

## Usage

```tsx
import React, { useState } from 'react'
import HTMLInput from 'react-input-with-html'

const App = () => {
  const [input, setInput] = useState('')

  return <HTMLInput id='input' html={input} onChange={setInput} />
}
```

## License

MIT © [cbot83](https://github.com/cbot83)

# Notes to jog by memory

## Development

```bash
npm start
```

in a new terminal

```bash
cd example
npm start
```

go to `http://localhost:3000/` for live updating version of component from src dir in a fake page from example dir

## Publishing to NPM

publish package to NPM
```bash
npm publish
```

deploy example to Github pages
```bash
npm deploy
```

## Helpful Posts

[Medium Article about Caret Position](https://medium.com/compass-true-north/a-dancing-caret-the-unknown-perils-of-adjusting-cursor-position-f252734f595e)

[Stack Overflow about Caret Position](https://stackoverflow.com/questions/6249095/how-to-set-caretcursor-position-in-contenteditable-element-div)