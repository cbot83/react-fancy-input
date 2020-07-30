import { getCaretPosition } from './utils'

const el = document.getElementById('input') as HTMLDivElement

// how do you grab the el and interact with it? pass it into a function?
test('gets current position of caret before use', () => {
  expect(getCaretPosition(el))
})
