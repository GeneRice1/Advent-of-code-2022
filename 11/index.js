import fs from "fs"

const mathFunctions = {
  "+": function (x, y) { return x + y },
  "-": function (x, y) { return x - y },
  "*": function (x, y) { return x * y },
  "/": function (x, y) { return(x/y)},
}

function parseMonkeys(lines) {
  let monkeys = []
  let currentMonkey = -1
  let pushObject = {}
  lines.forEach((line, index) => {
    if (line == "" || currentMonkey == -1) {
      if (Object.keys(pushObject).length != 0) {
        monkeys.push(pushObject)
        pushObject = {}
      }
      currentMonkey++
      return
    }
    let splitLine = line.split(" ").filter((item) => item != "" && item != "If")
    switch (splitLine[0]) {
      case "Starting":
        pushObject.startingItems = splitLine.slice(2, splitLine.length)
      case "Operation:":
        pushObject.operation = splitLine.slice(3, splitLine.length).join(" ")
      case "Test:":
        pushObject.test = parseInt(splitLine[3])
      case "true:":
        pushObject.true = parseInt(splitLine[4])
      case "false:":
        pushObject.false = parseInt(splitLine[4])
    }
    if(index == lines.length-1){ monkeys.push(pushObject) }
  })
  return(monkeys)
}

function completeOperation(operation, value) {
  value = value.toString().split(",")[0]
  operation = operation.split(" ").map((item) => item == "old" ? value : item)
  const completed = mathFunctions[operation[1]](BigInt(operation[0]), BigInt(operation[2]))
  return(completed)
}

function nextRound(monkeyList, inspections, worry) {
  monkeyList.forEach((monkey, index) => {
    let itemLength = monkey.startingItems.length
    inspections[index] += itemLength
    for (let i = 0; i < itemLength; i++){
      let operatedItem = completeOperation(monkey.operation, monkey.startingItems[0])
      operatedItem = (operatedItem / BigInt(worry)).toString()
      if (operatedItem % monkey.test == 0) {
        monkeyList[monkey.true].startingItems.push(operatedItem)
      } else {
        monkeyList[monkey.false].startingItems.push(operatedItem)
      }
      monkeyList[index].startingItems.shift()
    }
  })
  return([monkeyList, inspections])
}

function iterate(monkeyList, max, worry) {
  let maxRound = max
  let currentInspection = monkeyList.map(monkey => 0)
  for (let i = 0; i < maxRound; i++){
    nextRound(monkeyList, currentInspection, worry)
    if (i == 19) {
      console.log(i)
      console.log(currentInspection)
    }
    if (i % 1000 == 0) {
      console.log(i)
      console.log(currentInspection)
    }
  }
  return(currentInspection)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  const lineSplit = data.split("\r\n")
  let monkeyList = parseMonkeys(lineSplit)
  monkeyList = monkeyList.map(monkey => {
    return ({
      ...monkey,
      startingItems: monkey.startingItems.map(item => BigInt(item.split(",")[0]))
    })
  })
  console.log(monkeyList)
  // let inspectionOne = iterate(monkeyList, 20, 3)
  let inspectionTwo = iterate(monkeyList, 10000, 1)

  // inspectionOne = inspectionOne.map(num => num.toString()).sort((a, b) => b - a)
  // console.log(inspectionOne[0] * inspectionOne[1])

  inspectionTwo = inspectionTwo.map(num => num.toString()).sort((a, b) => b - a)
  console.log(inspectionTwo[0]*inspectionTwo[1])
})