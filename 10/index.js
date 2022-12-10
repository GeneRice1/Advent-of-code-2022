import fs from "fs"

function clockValue(instruction, xVal) {
  if (instruction == "noop") { return ([xVal]) }
  const splitInstruction = instruction.split(" ")
  if (splitInstruction[0] = "addx") {
    return([xVal, xVal+parseInt(splitInstruction[1])])
  }
}

function sumClockVals(clockValues) {
  let signals = [20, 60, 100, 140, 180, 220]
  let currentSum = 0
  signals.forEach((signal) => {
    currentSum += clockValues[signal-1]*signal
  })
  return(currentSum)
}

function drawImage(clockValues) {
  let drawing = []
  let row = -1
  clockValues.forEach((value, index) => {
    if (index == 0 || index % 40 == 0) {
      row++
      drawing.push([])
    }
    if (drawing[row].length >= value - 1 && drawing[row].length <= value + 1) {
      drawing[row].push("#")
    } else {
      drawing[row].push(".")
    }
  })
  drawing = drawing.map(row => row.join(""))
  console.log(drawing)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  let parsedLines = data.split("\r\n")
  let clock = [1]
  parsedLines.forEach((line) => {
    const addToClock = clockValue(line, clock.at(-1))
    clock = clock.concat(addToClock)
  })
  console.log(sumClockVals(clock))
  drawImage(clock)
})