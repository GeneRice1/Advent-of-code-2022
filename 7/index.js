import fs from "fs"
import _ from "lodash"

function directorySize(tree, position) {
  let size = 0
  const positionObject = _.get(tree, position)
  Object.keys(positionObject).forEach((item) => {
    if (!isNaN(positionObject[item])) {
      size += parseInt(positionObject[item])
    } else {
      size += directorySize(tree, position+`.${item}`)
    }
  })
  return(size)
}

function getSizes(lines) {
  let treeMap = { "/": {} }
  let dir = []
  let directoryPositions = ["/"]
  _.set(treeMap, "/.a", {})
  lines.forEach((line) => {
    let parsedLine = line.split(" ")
    if (parsedLine[1] == "cd") {
      if (parsedLine[2] == "..") {
        dir.pop()
      } else {
        dir.push(parsedLine[2])
      }
    } else if (!isNaN(parsedLine[0])) {
      _.set(treeMap, dir.join(".")+`.${parsedLine[1].split(".").join("")}`, parsedLine[0])
    } else if (parsedLine[0] == "dir") {
      const dirLocation = dir.join(".") + `.${parsedLine[1].split(".").join("")}`
      directoryPositions.push(dirLocation)
      _.set(treeMap, dirLocation, {})
    }
  })

  let directoryValues = []
  directoryPositions.forEach((position) => {
    let dirSize = directorySize(treeMap, position)
    directoryValues.push(dirSize)
  })
  return(directoryValues)
}

function smallestDifference(fileSizes) {
  const spaceNeeded = 40000000
  const maxFile = fileSizes[0]
  const filteredFiles = fileSizes.filter(file => file > maxFile - spaceNeeded)
  const sortedFiles = filteredFiles.sort((a, b) => a-b)[0]
  console.log(sortedFiles)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  const lineData = data.split("\r\n")
  const fileSizes = getSizes(lineData)
  smallestDifference(fileSizes)
})