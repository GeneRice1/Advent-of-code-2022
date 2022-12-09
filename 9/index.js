import fs from "fs"

function newHead(instruction, oldPos) {
  let newPos = []
  switch (instruction) {
    case "R":
      newPos = [oldPos[0] + 1, oldPos[1]]
      break
    case "L":
      newPos = [oldPos[0] - 1, oldPos[1]]
      break
    case "U":
      newPos = [oldPos[0], oldPos[1] + 1]
      break
    case "D":
      newPos = [oldPos[0], oldPos[1] - 1]
      break
  }
  return(newPos)
}

function newTail(headPos) {
  let tailPositions = [[0, 0]]
  headPos.forEach((coord) => {
    let [tailX, tailY, headX, headY] = [tailPositions.at(-1)[0], tailPositions.at(-1)[1], coord[0], coord[1]]
    let newPos = []
    if (Math.abs(tailX-headX) > 1 && Math.abs(tailY - headY) < 2) {
      newPos = [tailX + (headX-tailX > 0 ? 1 : -1), tailY + (headY-tailY)]
    } else if (Math.abs(tailY - headY) > 1 && Math.abs(tailX - headX) < 2) {
      newPos = [tailX + (headX-tailX), tailY + (headY-tailY > 0 ? 1 : -1)]
    } else if (Math.abs(tailX - headX) > 1 && Math.abs(tailY - headY) > 1) {
      newPos = [tailX + (headX-tailX > 0 ? 1 : -1), tailY + (headY-tailY > 0 ? 1 : -1)]
    }
    if (newPos.length > 0) { tailPositions.push(newPos) }
    if (Math.abs(Math.abs(coord[0])-Math.abs(tailPositions.at(-1)[0])) > 1 || Math.abs(Math.abs(coord[1])-Math.abs(tailPositions.at(-1)[1])) > 1) {
      console.log(coord[0], tailPositions.at(-1)[0])
    }
  })
  return(tailPositions)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  const lineSplit = data.split("\r\n")
  let headPositions = [[0, 0]]
  let instructions = []

  lineSplit.forEach((instr) => {
    instr = instr.split(" ")
    for (let i = 0; i < parseInt(instr[1]); i++){
      instructions.push(instr[0])
    }
  })

  instructions.forEach((instruction) => {
    headPositions.push(newHead(instruction, headPositions.at(-1)))
  })

  let lastPositions = headPositions
  for (let i = 0; i < 9; i++){
    lastPositions = newTail(lastPositions)
  }
  let flattenedPositions = lastPositions.map(item => JSON.stringify(item))
  console.log(flattenedPositions.filter((item, i) => flattenedPositions.indexOf(item) == i).length)
})