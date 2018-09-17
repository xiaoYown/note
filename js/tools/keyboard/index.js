const darwin = {
  /* number */
  0: { key: '0', code: 'Digit0', keyCode: '48' },
  1: { key: '1', code: 'Digit1', keyCode: '49' },
  2: { key: '2', code: 'Digit2', keyCode: '50' },
  3: { key: '3', code: 'Digit3', keyCode: '51' },
  4: { key: '4', code: 'Digit4', keyCode: '52' },
  5: { key: '5', code: 'Digit5', keyCode: '53' },
  6: { key: '6', code: 'Digit6', keyCode: '54' },
  7: { key: '7', code: 'Digit7', keyCode: '55' },
  8: { key: '8', code: 'Digit8', keyCode: '56' },
  9: { key: '9', code: 'Digit9', keyCode: '57' },
  /* a-z */
  a: { key: 'a', code: 'KeyA', keyCode: '65' },
  b: { key: 'b', code: 'KeyB', keyCode: '66' },
  c: { key: 'c', code: 'KeyC', keyCode: '67' },
  d: { key: 'd', code: 'KeyD', keyCode: '68' },
  e: { key: 'e', code: 'KeyE', keyCode: '69' },
  f: { key: 'f', code: 'KeyF', keyCode: '70' },
  g: { key: 'g', code: 'KeyG', keyCode: '71' },
  h: { key: 'h', code: 'KeyH', keyCode: '72' },
  i: { key: 'i', code: 'KeyI', keyCode: '73' },
  j: { key: 'j', code: 'KeyJ', keyCode: '74' },
  k: { key: 'k', code: 'KeyK', keyCode: '75' },
  l: { key: 'l', code: 'KeyL', keyCode: '76' },
  m: { key: 'm', code: 'KeyM', keyCode: '77' },
  n: { key: 'n', code: 'KeyN', keyCode: '78' },
  o: { key: 'o', code: 'KeyO', keyCode: '79' },
  p: { key: 'p', code: 'KeyP', keyCode: '80' },
  q: { key: 'q', code: 'KeyQ', keyCode: '81' },
  r: { key: 'r', code: 'KeyR', keyCode: '82' },
  s: { key: 's', code: 'KeyS', keyCode: '83' },
  t: { key: 't', code: 'KeyT', keyCode: '84' },
  u: { key: 'u', code: 'KeyU', keyCode: '85' },
  v: { key: 'v', code: 'KeyV', keyCode: '86' },
  w: { key: 'w', code: 'KeyW', keyCode: '87' },
  x: { key: 'x', code: 'KeyX', keyCode: '88' },
  y: { key: 'y', code: 'KeyY', keyCode: '89' },
  z: { key: 'z', code: 'KeyZ', keyCode: '90' },
  /* f1-f12 */
  F1: { key: 'F1', code: 'F1', keyCode: '112' },
  F2: { key: 'F2', code: 'F2', keyCode: '113' },
  F3: { key: 'F3', code: 'F3', keyCode: '114' },
  F4: { key: 'F4', code: 'F4', keyCode: '115' },
  F5: { key: 'F5', code: 'F5', keyCode: '116' },
  F6: { key: 'F6', code: 'F6', keyCode: '117' },
  F7: { key: 'F7', code: 'F7', keyCode: '118' },
  F8: { key: 'F8', code: 'F8', keyCode: '119' },
  F9: { key: 'F9', code: 'F9', keyCode: '120' },
  F10: { key: 'F10', code: 'F10', keyCode: '121' },
  /* symbol */
  '`': { key: '`', code: 'Backquote', keyCode: '192' },
  '-': { key: '-', code: 'Minus', keyCode: '189' },
  '=': { key: '=', code: 'Equal', keyCode: '187' },
  '[': { key: '[', code: 'BracketLeft', keyCode: '219' },
  ']': { key: ']', code: 'BracketRight', keyCode: '221' },
  '\\': { key: '\\', code: 'Backslash', keyCode: '220' },
  ';': { key: ';', code: 'Semicolon', keyCode: '186' },
  '\'': { key: '\'', code: 'Quote', keyCode: '222' },
  ',': { key: ',', code: 'Comma', keyCode: '188' },
  '.': { key: '.', code: 'Period', keyCode: '190' },
  '/': { key: '/', code: 'Slash', keyCode: '191' },
  ' ': { key: ' ', code: 'Space', keyCode: '32' },
  /* symbol base on shift */
  ')': { key: ')', code: 'Digit0', keyCode: '48' },
  '!': { key: '!', code: 'Digit1', keyCode: '49' },
  '@': { key: '@', code: 'Digit2', keyCode: '50' },
  '#': { key: '#', code: 'Digit3', keyCode: '51' },
  '$': { key: '$', code: 'Digit4', keyCode: '52' },
  '%': { key: '%', code: 'Digit5', keyCode: '53' },
  '^': { key: '^', code: 'Digit6', keyCode: '54' },
  '&': { key: '&', code: 'Digit7', keyCode: '55' },
  '*': { key: '*', code: 'Digit8', keyCode: '56' },
  '(': { key: '(', code: 'Digit9', keyCode: '57' },
  ':': { key: ':', code: 'Semicolon', keyCode: '186' },
  '+': { key: '+', code: 'Equal', keyCode: '187' },
  '<': { key: '<', code: 'Comma', keyCode: '188' },
  '_': { key: '_', code: 'Minus', keyCode: '189' },
  '?': { key: '?', code: 'Slash', keyCode: '191' },
  '>': { key: '>', code: 'Period', keyCode: '190' },
  '~': { key: '~', code: 'Backquote', keyCode: '192' },
  '{': { key: '{', code: 'BracketLeft', keyCode: '219' },
  '|': { key: '|', code: 'Backslash', keyCode: '220' },
  '"': { key: '"', code: 'Quote', keyCode: '222' },
  '}': { key: '}', code: 'BracketRight', keyCode: '221' },
  /* direct */
  ArrowLeft: { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: '37' },
  ArrowUp: { key: 'ArrowUp', code: 'ArrowUp', keyCode: '38' },
  ArrowRight: { key: 'ArrowRight', code: 'ArrowRight', keyCode: '39' },
  ArrowDown: { key: 'ArrowDown', code: 'ArrowDown', keyCode: '40' },
  /* assist */
  Shift: { key: 'Shift', code: 'ShiftLeft', keyCode: '16' },
  Control: { key: 'Control', code: 'ControlLeft', keyCode: '17' },
  Alt: { key: 'Alt', code: 'AltLeft', keyCode: '18' },
  CapsLock: { key: 'CapsLock', code: 'CapsLock', keyCode: '20' },
  Meta: { key: 'Meta', code: 'MetaLeft', keyCode: '91' },
  /* operations */
  Backspace: { key: 'Backspace', code: 'Backspace', keyCode: '8' },
  Tab: { key: 'Tab', code: 'Tab', keyCode: '9' },
  Enter: { key: 'Enter', code: 'Enter', keyCode: '13' },
  Escape: { key: 'Escape', code: 'Escape', keyCode: '27' }
};
const keyboards = {
  darwin
  // win32,
  // aix,
  // freebsd,
  // linux,
  // openbsd,
  // sunos
};

var old = null

window.addEventListener('keydown', event => {
  console.log(`
    ${event.key}: {
      key: '${event.key}',
      code: '${event.code}',
      keyCode: '${event.keyCode}'
    }
  `)
})
