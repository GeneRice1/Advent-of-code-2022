import fs from "fs"

fs.readFile("input.txt", "utf-8", (err, data) => {
    const splitData = data.split("\r\n")
    let addedData = []
    let currIndex = 0
    splitData.forEach((num, index) => {
        if (index == 0) {
            addedData.push(parseInt(num))
        } else if (num == "") {
            addedData.push(0)
            currIndex += 1
        } else {
            addedData[currIndex] += parseInt(num)
        }
    })
    addedData = addedData.sort((a, b) => a - b)
    console.log(addedData[addedData.length-1]+addedData[addedData.length-2]+addedData[addedData.length-3])
})
