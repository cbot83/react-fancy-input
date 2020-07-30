// not sure what this is doing, but should probably sanitize javascript injection
export const normalizeHtml = (str: string): string => {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')
}

// getting current position of caret to set in state as a reference
export const getCaretPosition = (el: HTMLDivElement | null) => {
  let caretOffset = 0

  if (!el) return

  if (typeof window.getSelection !== 'undefined') {
    const range = window.getSelection()?.getRangeAt(0)
    const selected = range?.toString().length
    const preCaretRange = range?.cloneRange()

    // @ts-ignore
    preCaretRange.selectNodeContents(el)
    // @ts-ignore
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    // @ts-ignore
    caretOffset = preCaretRange.toString().length - selected
  }

  return caretOffset
}

export const getAllTextnodes = (el: HTMLDivElement) => {
  let node
  const textNodeArr = []

  const treeWalker = document.createTreeWalker(
    el,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )

  while ((node = treeWalker.nextNode())) textNodeArr.push(node)

  return textNodeArr
}

export const getCaretData = (
  el: HTMLDivElement,
  position: number,
  setCaretPos: (arg: number) => void
) => {
  let node

  const nodes = getAllTextnodes(el)

  for (var n = 0; n < nodes.length; n++) {
    // @ts-ignore
    if (position > nodes[n].nodeValue.length && nodes[n + 1]) {
      // remove amount from the position, go to next node
      // @ts-ignore
      position -= nodes[n].nodeValue.length
    } else {
      node = nodes[n]
      break
    }
  }

  // resets node and position settings if all html input is cleared

  if (!node) {
    setCaretPos(-1)

    return { node: node, position: -1 }
  }

  // gives current position

  return { node: node, position: position }
}

type NodeData = {
  node: Node
  position: number
}

export const placeCaret = (data: NodeData) => {
  const selection = window.getSelection()
  const range = document.createRange()

  // programatic html generation can throws off the caret pos.

  // this protects against placing caret where it can't go

  const canPlaceCaret =
    selection &&
    data &&
    data.node &&
    data.position >= 0 &&
    data.node.nodeValue &&
    data.node.nodeValue.length >= data.position

  if (canPlaceCaret) {
    range.setStart(data.node, data.position)

    range.collapse(true)

    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}
