import fs from "fs"

let startBase = fs.readFileSync("input.txt", "utf-8")
fs.writeFileSync("output.txt", startBase)

function isValid(checkItem, itemAscii, numGrid, x, y) {
  let checkAscii = checkItem.charCodeAt(0)
  if (checkAscii - itemAscii >= -1) {
    return(numGrid[x][y])
  }
  return(null)
}

class Graph {
  constructor(props) {
    this.nodes = {}
  }

  addNode(node) {
    if (this.nodes[node]) { return }
    this.nodes[node] = []
  }

  addEdge(start, end) {
    if (!this.nodes[start].includes(end)) {
      this.nodes[start].push(end)
    }
    if (Math.abs(start.split(0, 1)[0].charCodeAt(0) - end.split(0, 1)[0].charCodeAt(0)) <= 1) {
      if (!this.nodes[end].includes(start)) {
        this.nodes[end].push(start)
      }
    }
  }

  showNodes() {
    console.log(this.nodes)
  }

  shortestPath(start, end) {
    let visitedQueue = {}
    let queue = [start]
    let iteration = 0
    let found = false

    while (!found) {
      if (!queue.length) {
        return(false)
      }
      let pushItems = []
      queue.forEach((item) => {
        let children = this.nodes[item]
        children.forEach((child) => {
          if (child == end) {
            found = true
          }
          if (Object.keys(visitedQueue).includes(child)) {
            return
          }
          pushItems.push(child)
          visitedQueue[child] = iteration
        })
      })
      iteration++
      queue = pushItems
    }
    return(iteration)
  }
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  let startPos = 0
  let endPos = 0
  let landGraph = new Graph()

  let charGrid = data.split("\r\n").map((row, index) => row.split("").map((item) => {
    if (item == "S") { item = "a" }
    else if (item == "E") { item = "z" }
    return(item)
  }))

  let grid = data.split("\r\n").map((row, index) => row.split("").map((item, itemIndex) => {
    let returnVal = `${item}[${index} ${itemIndex}]`
    if (item == "S") {
      startPos = returnVal
    }
    else if (item == "E") {
      endPos = returnVal
    }
    landGraph.addNode(returnVal)
    return(returnVal)
  }))

  let startingPositions = []
  grid.forEach((row) => {
    if (row[0].slice(0, 1) == "a" || row[0].slice(0, 1) == "S") {
      startingPositions.push(row[0])
    }
  })

  charGrid.forEach((row, index) => {
    row.forEach((item, itemIndex) => {
      let edges = [null, null, null, null]
      let itemAscii = item.charCodeAt(0)
      if (row[itemIndex - 1]) { edges[0] = isValid(row[itemIndex - 1], itemAscii, grid, index, itemIndex - 1) }
      if (row[itemIndex + 1]) { edges[1] = isValid(row[itemIndex + 1], itemAscii, grid, index, itemIndex + 1) }
      if (charGrid[index - 1] && charGrid[index - 1][itemIndex]) { edges[2] = isValid(charGrid[index - 1][itemIndex], itemAscii, grid, index - 1, itemIndex) }
      if (charGrid[index + 1] && charGrid[index + 1][itemIndex]) { edges[2] = isValid(charGrid[index + 1][itemIndex], itemAscii, grid, index + 1, itemIndex) }
      edges = edges.filter(edge => edge != null)
      edges.forEach((edge) => {
        landGraph.addEdge(grid[index][itemIndex], edge)
      })
    })
  })

  let lengths = []

  startingPositions.forEach((pos) => {
    console.log(pos)
    const currentLength = landGraph.shortestPath(endPos,pos)
    lengths.push(currentLength)
  })

  lengths = lengths.sort((a, b) => a-b)
  console.log(lengths)
  console.log(startPos, endPos)
})