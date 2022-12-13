import fs from "fs"

function checkItems(item1, item2) {
  if (Array.isArray(item1) && typeof item2 == "number") {
    item2 = [item2]
  }

  if (Array.isArray(item2) && typeof item1 == "number") {
    item1 = [item1]
  }

  if (typeof item1 == "number" && typeof item2 == "number") {
    if (item1 < item2) {
      return (1)
    }
    else if (item1 == item2) {
      return(0)
    }
    else {
      return (-1)
    }
  }
  if (Array.isArray(item1) && Array.isArray(item1)) {
    let i = 0
    while (i < item1.length && i < item2.length) {
      let valid = checkItems(item1[i], item2[i])

      if (valid == 1) {
        return(1)
      }
      if (valid == -1) {
        return (-1)
      }

      i++
    }

    if (i == item1.length) {
      if (item1.length == item2.length) {
        return(0)
      }
      return(1)
    }
    return(-1)
  }
}

function part1(pairs) {
  let indeces = 0
  for (let i = 0; i < pairs.length; i++){
    let checkedItems = checkItems(pairs[i][0], pairs[i][1], pairs[i][0], pairs[i][1])
    if  (checkedItems == 1) {
      indeces += i + 1
    }
  }
  console.log(indeces)
}

function part2(pairs) {
  pairs.push([[[2]], [[6]]])
  let items = pairs.flat(1)
  let changes = -1
  let signals = ["[[2]]", "[[6]]"]
  let decoder = 1
  while (changes != 0) {
    changes = 0
    items.forEach((item, index) => {
      if (items[index + 1] && checkItems(item, items[index+1]) == -1) {
        let current = item
        items[index] = items[index + 1]
        items[index + 1] = current
        changes++
      }
    })
  }

  items.forEach((item, index) => {
    item = JSON.stringify(item)
    if (signals.includes(item)) {
      decoder *= index + 1
    }
  })
  console.log(decoder)
}

function parseToDatatypes(data) {
  const splitData = data.split("\r\n")
  let pairs = [[]]
  splitData.forEach((line) => {
    if (line == "") {
      pairs.push([])
      return
    }
    pairs[pairs.length-1].push(JSON.parse(line))
  })
  return(pairs)
}

fs.readFile("input.txt", "utf-8", (err, data) => {
  const parsedData = parseToDatatypes(data)
  part1(parsedData)
  part2(parsedData)
})