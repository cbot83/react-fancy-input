/**
 * an input element that can display programatic html but only takes string input
 */

import { clone } from 'lodash'
import React, { useEffect, useState } from 'react'
import {
  getCaretData,
  getCaretPosition,
  normalizeHtml,
  placeCaret
} from './utils'

type ModifierObj = {
  regexMatch: RegExp
  htmlModification: string | any // need better function definition
  match?: boolean
}

type Props = {
  id: string
  originalString: string
  modifierArr: ModifierObj[]
  onChange: (arg1: string) => void // your `setInput` string hook;
  disabled?: boolean
  className?: string
  onBlur?: any
  onKeyUp?: any
  onKeyDown?: any
  spellCheck?: boolean
}

const HTMLInput = ({
  id,
  originalString,
  modifierArr,
  disabled = false,
  spellCheck = true,
  onChange,
  onBlur,
  onKeyUp,
  onKeyDown,
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
    if (originalString) {
      const inputDisplay = buildStyledString(originalString)
      setInputWithHTML(inputDisplay)
    } else if (!originalString) {
      setInputWithHTML('')
    }
  }, [originalString])

  const emitChange = (e: any) => {
    const el = e.currentTarget
    const position = getCaretPosition(el)

    onChange(el.innerText)
    setCaretPos(position)
  }

  const buildStyledString = (originalString: string): string => {
    let mutableInput = clone(originalString)

    // adds match true or false to modifierObj
    const mutableModifier = modifierArr.map((modifier) => {
      const match = modifier.regexMatch.test(originalString)
      modifier.match = match
      return modifier
    })

    // for each match, find every stance and run the modification
    mutableModifier.forEach((modifier) => {
      if (modifier.match) {
        const arr = mutableInput?.match(modifier.regexMatch)
        const uniqueArr = [...new Set(arr)]

        const modifyAll = () => {
          const value = uniqueArr?.forEach((value) => {
            const correctModifier =
              typeof modifier.htmlModification === 'string'
                ? modifier.htmlModification
                : modifier.htmlModification(value)
            //
            mutableInput = mutableInput?.replace(
              modifier.regexMatch,
              correctModifier
            )
          })
          return value
        }

        modifyAll()
      }
    })

    return mutableInput
  }

  return (
    <div
      id={id}
      style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
      contentEditable={!disabled}
      onInput={emitChange}
      onBlur={onBlur || emitChange}
      onKeyUp={onKeyUp || emitChange}
      onKeyDown={onKeyDown || emitChange}
      dangerouslySetInnerHTML={{ __html: normalizeHtml(inputWithHTML) }}
      {...props}
    />
  )
}

export default HTMLInput
