/**
 * an input element that can display programatic html but only takes string input
 */

import React, { useEffect, useState } from 'react'
import {
  getCaretData,
  placeCaret,
  getCaretPosition,
  normalizeHtml
} from './utils'

type Props = {
  id: string
  html: string // your display of the html
  onChange: (arg1: string) => void // your `setInput` string hook;
  disabled?: boolean
  className?: string
  onBlur?: any
  onKeyUp?: any
  onKeyDown?: any
  spellCheck?: boolean
}

const HTMLInput = ({
  html,
  disabled = false,
  spellCheck = true,
  onChange,
  onBlur,
  onKeyUp,
  onKeyDown,
  id,
  ...props
}: Props) => {
  const [caretPos, setCaretPos] = useState(-1)

  useEffect(() => {
    const el = document.getElementById(id) as HTMLDivElement
    const caretData = getCaretData(el, caretPos, setCaretPos)

    // only place caret if there is somewhere for it to go
    if (caretData.node) placeCaret(caretData)
  }, [html])

  const emitChange = (e: any) => {
    const el = e.currentTarget
    const position = getCaretPosition(el)

    onChange(el.innerText)
    setCaretPos(position)
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
      dangerouslySetInnerHTML={{ __html: normalizeHtml(html) }}
      {...props}
    />
  )
}

export default HTMLInput
