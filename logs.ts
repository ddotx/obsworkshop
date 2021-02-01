const blue = 'color:blue;'
const pink = 'color:pink;'

function logColor(val: string, color: string) {
  console.log(`%c${val}`, color)
}

export const logBlue = (v) => logColor(v, blue)

export const logPink = (v) => logColor(v, pink)

