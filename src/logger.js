import avgLines from './index'

const args = process.argv.slice(/node/.test(process.argv[0]) ? 2 : 1).map(v => `'${v}'`).join(' ')
const log = str => {
  let bold = false
  const newStr = str.split('**').reduce((pv, v) => (bold = !bold, `${pv}\x1b[${bold ? 1 : 0}m${v}`))
  console.log(newStr)}

export default avgLines(args).then(
  ({numFiles, numLines, avgLines: avgLines$, linesInequality, largestFileName, largestFile}) => (
    log(`Checked **${numFiles}** files (**${numLines}** LOC):`),
    log(`  **80%** of files contain > **${avgLines$}** LOC`),
    log(`  **20%** of files contain **${(linesInequality * 100).toFixed(2)}%** of the total LOC`),
    log(`  The largest file (**${largestFileName}**) contains **${largestFile}** LOC`))).
  catch(::console.error)
