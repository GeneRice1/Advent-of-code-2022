import fs from "fs"

function isHidden(treeMap, treeHeight, x, y) {
  let isTaller = [false, false, false, false]
  let hidden = false
  for (let i = 0; i < x; i++){
    if (treeMap[y][i] >= treeHeight) {
      isTaller[0] = true
    }
  }
  for (let i = treeMap[y].length; i > x; i--){
    if (treeMap[y][i] >= treeHeight) {
      isTaller[1] = true
    }
  }
  for (let i = 0; i < y; i++){
    if (treeMap[i][x] >= treeHeight) {
      isTaller[2] = true
    }
  }
  for (let i = treeMap.length-1; i > y; i--){
    if (treeMap[i][x] >= treeHeight) {
      isTaller[3] = true
    }
  }
  const final = isTaller.filter(item => item == false)
  if (final.length == 0) {
    hidden = true
  }
  return(hidden)
}

function getDistance(line, index) {
  const watchLine = line.slice(index + 1, line.length)
  let distance = 0
  for (const item of watchLine) {
    distance++
    if (item >= line[index]) {break}
  }
  return(distance)
}

function viewingDistance(treeMap, x, y) {
  let directions = []
  let rotatedArray = []
  treeMap.forEach((row) => {
    row.forEach((item, i) => {
      if (rotatedArray.length - 1 < i) { rotatedArray.push([]) }
      rotatedArray[i].push(item)
    })
  })
  directions.push(getDistance(treeMap[y], x))
  directions.push(getDistance([...treeMap[y]].reverse(), treeMap[y].length - x - 1))
  directions.push(getDistance(rotatedArray[x], y))
  directions.push(getDistance([...rotatedArray[x]].reverse(), treeMap[x].length - y - 1))
  return(directions.reduce((a, b) => a*b))
}

function countVisible(hiddenMap) {
  let hiddenCount = 0
  hiddenMap.forEach((row) => {
    row.forEach((item) => {
      if (!item) {hiddenCount++}
    })
  })
  return(hiddenCount)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  const lineData = data.split("\r\n")
  const treeMap = lineData.map(line => line.split(""))

  let hiddenList = []
  let scenicScore = []
  treeMap.forEach((row, y) => {
    hiddenList.push([])
    row.forEach((tree, x) => {
      hiddenList[y].push(isHidden(treeMap, tree, x, y))
      scenicScore.push(viewingDistance(treeMap, x, y))
    })
  })
  const visible = countVisible(hiddenList)
  console.log(scenicScore.sort((a, b) => b-a)[0])
})