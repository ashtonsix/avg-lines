import {exec} from 'child_process'

const i80 = arr => Math.ceil(arr.length * 0.8)
const sum = arr => arr.reduce((pv, [v]) => pv + v, 0)

export default args => new Promise((resolve, reject) =>
  exec(`find ${args} | xargs wc -l`, {maxBuffer: 1024 ** 2}, (err, input) => {
    if (err) reject(err)
    else {
      const files = input.split('\n').slice(0, -2).map(l =>
        l.match(/^ *(\d+) +(.+)$/).slice(1)).
        map(([val, file]) => [parseInt(val, 10), file]).
        sort(([v0], [v1]) => v0 - v1)
      if (!files.length) reject(`No files matched \`find ${args}\``)
      else {
        resolve({
          numFiles: files.length,
          numLines: sum(files),
          avgLines: files[i80(files)][0],
          linesIneqaulity: sum(files.slice(i80(files))) / sum(files),
          largestFileName: files.slice(-1)[0][1],
          largestFile: files.slice(-1)[0][0]})}}}))
