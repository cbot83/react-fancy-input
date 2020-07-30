# react-input-with-html

> A react input component that uses contenteditable on a div to display the input value with html cut in for that touch of fancy

[![NPM](https://img.shields.io/npm/v/react-input-with-html.svg)](https://www.npmjs.com/package/react-input-with-html) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![bundle size](https://img.shields.io/bundlephobia/minzip/react-contenteditable.svg)](https://www.npmjs.com/package/react-input-with-html)

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

## Available props
|prop|description|type|
|--|----|----|
|id|**required:** unique id|String|
|modifierArr|**required:** more on this below|Array of Objects|
|disabled|use true to disable editing|Boolean|
|onChange|**required:** react hook for keeping input state|Function|
|onBlur|called whenever the html element is [blurred](https://developer.mozilla.org/en-US/docs/Web/Events/blur)|Function|
|onFocus|event fires when an element has received [focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)|Function|
|onKeyUp|called whenever a key is released|Function|
|onKeyDown|called whenever a key is pressed |Function|
|spellCheck|toggles auto underlining spelling errors|Boolean|

## Modifier Arr

This is the customizable part of this component.

You need to pass an Array of ModifierObj(s) see type below

```
type ModifierObj = {
  regexMatch: RegExp
  htmlModification: string | Function // need better function definition, it has to return a html represented as string
}
```

The regexMatch is a regular expression to find the instances you want to modify

The htmlModification is the string that includes the html for what you're changing it to. This can be a string or a function that returns the string.

put examples here...

## Playground

will be more of a playground in the future

[Try it out](https://cbot83.github.io/react-input-with-html/)

## Important Notes

don't use v1 of this library. It's a very limited concept with lots of bugs.



## License

MIT © [cbot83](https://github.com/cbot83)

<!--

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
npm run deploy
```

goes to `https://cbot83.github.io/react-input-with-html/`

make this into a playground in the future

## Helpful Posts

[Level Up Make a React Library](https://levelup.gitconnected.com/create-your-own-react-library-in-2020-step-by-step-7c39eb1b2d7b)

[Medium Article about Caret Position](https://medium.com/compass-true-north/a-dancing-caret-the-unknown-perils-of-adjusting-cursor-position-f252734f595e)

[Stack Overflow about Caret Position](https://stackoverflow.com/questions/6249095/how-to-set-caretcursor-position-in-contenteditable-element-div)

-->
