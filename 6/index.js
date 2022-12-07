import fs from "fs"

fs.readFile("input.txt", "utf-8", (err, data) => {
    for (let i = 0; i < data.length; i++){
        const dataArray = data.slice(i, i + 14).split("")
        let isDuplicate = false
        dataArray.forEach((item, index) => {
            if (dataArray.indexOf(item) != index) {isDuplicate = true}
        })
        if (isDuplicate == false) {
            console.log(i + 14)
            break
        }
    }
})