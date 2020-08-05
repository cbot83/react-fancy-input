/**
 * an input element that can display programatic html but only takes string input
 * with a built in hex dot option
 */

import { clone } from 'lodash'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import {
  getCaretData,
  getCaretPosition,
  normalizeHtml,
  placeCaret
} from './utils'

type ModifierObj = {
  regexMatch: RegExp
  htmlMod: string | Function // if it's a function than it's matching many different strings possibly
  match?: boolean
}

type HexDotObj = {
  enable: boolean
  fontSize: number
}

type Props = {
  id: string
  value: string
  modifierArr: ModifierObj[]
  onChange: (arg1: string) => void // your `setInput` string hook;
  highlightThis?: string | boolean
  onSubmit?: Function
  disabled?: boolean
  className?: string
  onBlur?: any
  onKeyUp?: any
  onKeyDown?: any
  spellCheck?: boolean
  hexDot?: HexDotObj
  style?: any
}

const HTMLInput = ({
  id,
  value,
  disabled = false,
  spellCheck = true,
  onChange,
  modifierArr,
  onSubmit,
  onBlur,
  onKeyUp,
  onKeyDown,
  hexDot,
  style,
  highlightThis,
  ...props
}: Props) => {
  const [inputWithHTML, setInputWithHTML] = useState('')
  const [caretPos, setCaretPos] = useState(-1)

  useEffect(() => {
    const el = document.getElementById(id) as HTMLDivElement
    const caretData = getCaretData(el, caretPos, setCaretPos)

    // only place caret if there is somewhere for it to go
    if (caretData.node) placeCaret(caretData)
  }, [inputWithHTML])

  useEffect(() => {
    const highlightedString = (inputDisplay: string): string => {
      let mutableInput = clone(inputDisplay)
      if (highlightThis && typeof highlightThis === 'string') {
        // @ts-ignore
        const re = new RegExp(`${highlightThis}(?!">)`, 'gi')

        mutableInput = mutableInput.replace(
          re,
          `<span style="background-color: #b4ffc4">${highlightThis}</span>`
        )
      } else if (highlightThis && typeof highlightThis === 'boolean') {
        mutableInput = `<span style="background-color: #b4ffc4">${inputDisplay}</span>`
      }
      return mutableInput
    }

    const inputDisplay = buildStyledString(value)
    if (highlightThis) {
      const highlighted = highlightedString(inputDisplay)
      setInputWithHTML(highlighted)
    } else {
      setInputWithHTML(inputDisplay)
    }
  }, [highlightThis])

  useEffect(() => {
    if (value) {
      const inputDisplay = buildStyledString(value)
      setInputWithHTML(inputDisplay)
    } else if (!value) {
      setInputWithHTML('')
    }
  }, [value])

  const emitChange = (e: any) => {
    // handle enter and call onSubmit if it was give
    const enter = e.keyCode === 13
    if (enter && onSubmit) {
      e.preventDefault()
      onSubmit()
      return
    }
    if (enter) {
      e.preventDefault()
      return
    }

    const el = e.currentTarget
    const position = getCaretPosition(el)

    onChange(el.innerText)
    setCaretPos(position || -1)
  }

  const buildStyledString = (value: string): string => {
    let mutableInput = clone(value)

    const fontSize = hexDot?.fontSize === 24 ? 24 : 11

    const mutableModifierArr = clone(modifierArr)

    if (hexDot?.enable) {
      const dynamicHexMod = (value: string): any => {
        return `<span class="${
          fontSize === 24 ? styles.hexdot_24 : styles.hexdot_11
        }" style="--color: ${value}">${value}</span>`
      }

      const hexDot = {
        // only matches hex codes that aren't in style (followed by ")
        regexMatch: /#[0-9A-F]{6}(?!">)/gi,
        htmlMod: dynamicHexMod
      }
      mutableModifierArr.push(hexDot)
    }

    // adds match true or false to modifierObj
    const mutableModifier = mutableModifierArr.map((modifier) => {
      const match = modifier.regexMatch.test(value)
      modifier.match = match
      return modifier
    })

    // for each match, find every instance and run the modification
    mutableModifier.forEach((modifier) => {
      if (modifier.match) {
        const arr = mutableInput?.match(modifier.regexMatch)
        const unique = (value: any, index: any, self: any) => {
          return self.indexOf(value) === index
        }
        const uniqueArr = arr?.filter(unique)

        const modifyAll = () => {
          const value = uniqueArr?.forEach((v) => {
            const correctModifier =
              typeof modifier.htmlMod === 'string'
                ? modifier.htmlMod
                : modifier.htmlMod(v)

            // function htmlMods can match many different strings and need special treatment
            if (typeof modifier.htmlMod === 'function') {
              const re = new RegExp(v, 'g')
              mutableInput = mutableInput?.replace(re, correctModifier)
            } else {
              mutableInput = mutableInput?.replace(
                modifier.regexMatch,
                correctModifier
              )
            }
          })
          return value
        }

        modifyAll()
      }
    })

    // clears out any new lines
    const newLineRegex = /\r?\n|\r/g
    mutableInput.replace(newLineRegex, '')

    return mutableInput
  }

  return (
    <div
      id={id}
      // respects any spaces and styles close to a native input
      className={styles.input}
      contentEditable={!disabled}
      onInput={emitChange}
      onBlur={onBlur || emitChange}
      onKeyUp={onKeyUp || emitChange}
      onKeyDown={onKeyDown || emitChange}
      dangerouslySetInnerHTML={{ __html: normalizeHtml(inputWithHTML) }}
      spellCheck={spellCheck}
      style={style}
      {...props}
    />
  )
}

export default HTMLInput
