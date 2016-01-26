import {exec} from 'child_process'

const i80 = arr => Math.ceil(arr.length * 0.8)
const sum = arr => arr.reduce((pv, [v]) => pv + v, 0)
const insertTypeOption = args =>
  /('?[-\|])/.test(args) ? args.replace(/('?[-\|])/, '-type f $&') : `${args} -type f`
const generateCommand = args => `find ${insertTypeOption(args)} | xargs wc -l`

export default args => new Promise((resolve, reject) => {
  const process = exec(generateCommand(args))
  const files = []
  const interval = setInterval(() => console.log(`checked ${files.length} files`), 3000)
  process.stderr.on('data', ::console.error)
  process.stdout.on('data', input => (
    files.push(
      ...input.split('\n').filter(v => v).map(l => (
        l.match(/^ *(\d+) +(.+)$/).filter(v => v))).
        map(([, val, file]) => [parseInt(val, 10), file]).
        filter(([, filename]) => filename !== 'total'))))
  process.on('close', exit => {
    clearInterval(interval)
    if (exit) reject(exit)
    files.sort(([v0], [v1]) => v0 - v1)
    if (!files.length) reject(`No files matched \`${generateCommand(args)}\``)
    else {
      resolve({
        numFiles: files.length,
        numLines: sum(files),
        avgLines: files[i80(files)][0],
        linesIneqaulity: sum(files.slice(i80(files))) / sum(files),
        largestFileName: files.slice(-1)[0][1],
        largestFile: files.slice(-1)[0][0]})}})})
