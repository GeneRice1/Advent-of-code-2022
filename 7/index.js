import fs, { watch } from "fs"
import _ from "lodash"

function part2(flatTree) {
  const totalSpace = 70000000
  const requiredSpace = 30000000
  const usedSpace = 48381165
  console.log(usedSpace-requiredSpace)
  const valid = flatTree.filter(item => item > usedSpace - requiredSpace)
  const smallest = valid.sort((a, b) => a - b)
  console.log(smallest)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  const lineData = data.split("\r\n")
  let treeMap = { "/": {} }
  let dir = []
  let directoryPositions = ["/"]
  _.set(treeMap, "/.a", {})
  lineData.forEach((line) => {
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
    let subDirectory = _.get(treeMap, position)
    let flattenedDirectory = Object.assign(
      {},
      ...function _flatten(o) {
        return [].concat(...Object.keys(o)
          .map(k =>
            typeof o[k] === 'object' ?
              _flatten(o[k]) :
              ({[k]: o[k]})
          )
        );
      }(subDirectory)
    )
    let intValues = Object.values(flattenedDirectory).map(val => parseInt(val))
    let total = intValues.reduce((a, b) => a + b)
    directoryValues.push(total)
  })
  part2(directoryValues)
})