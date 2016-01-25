import {exec} from 'child_process'

const pipe = (args, ...stack) => stack.reduce((pv, v) => v(pv), args)
const args = process.argv.slice(process.argv[0] === 'node' ? 2 : 1).join(' ')
const i80 = arr => Math.ceil(arr.length * 0.8)
const sum = arr => arr.reduce((pv, [v]) => pv + v, 0)
const log = str => {
  let bold = false
  pipe(str.split('**').reduce((pv, v) =>
    (bold = !bold, `${pv}\x1b[${bold ? 1 : 0}m${v}`)),
    ::console.log)}

exec(`find ${args} | xargs wc -l`, (err, input) =>
  err ? console.error(err) :
  pipe(input.split('\n').slice(0, -2).map(l =>
    l.match(/^ *(\d+) +(.+)$/).slice(1)).
    map(([val, file]) => [parseInt(val, 10), file]).
    sort(([v0], [v1]) => v0 - v1),
    files => (
      log(`Checked **${files.length}** files (**` + sum(files) + `** LOC):`),
      log(`  **80%** of files contain > **` + files[i80(files)][0] + `** LOC`),
      log(`  **20%** of files contain **` + (
        sum(files.slice(i80(files))) /
        sum(files) * 100).
        toFixed(2) +
        `%** of the LOC`),
      log(`  The largest file (**${files.slice(-1)[0][1]}**) contains **${files.slice(-1)[0][0]}** LOC`))))
