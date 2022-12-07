import fs from "fs"

function getContained() {
    fs.readFile("input.txt", "utf-8", (err, data) => {
        const pairs = data.split("\n")
        const numbers = pairs.map(val => val.split(/[-,]+/)).map(val => val.map(interVal => parseInt(interVal)))
        let isGreater = 0
        numbers.forEach((group, index) => {
            if (group[0] <= group[2] && group[1] >= group[2] || group[0] <= group[3] && group[1] >= group[3] || group[0] >= group[2] && group[1] <= group[3] || group[0] <= group[2] && group[1] >= group[3]) {
                isGreater += 1
            } else {
                console.log(group)
            }
        })
        console.log(isGreater)
    })
}

getContained()