import fs from "fs"
function moveStacks() {
    fs.readFile("input.txt", "utf-8", (err, data) => {
        const lineData = data.split("\r\n")
        let splitIndex = 0
        lineData.forEach((line, index) => {
            if (line == "") {splitIndex = index}
        })
        let layout = lineData.slice(0, splitIndex)
        let instructions = lineData.slice(splitIndex + 1, lineData.length)
        let readableLayout = []
        layout.forEach((row, index) => {
            for (let i = 0; i < row.length; i += 4){
                const update = row.slice(i, i + 3)
                readableLayout[i/4] ? readableLayout[i/4].push(update) : readableLayout.push([update])
            }
        })
        readableLayout = readableLayout.map(row => row.filter(item => item != "   "))

        instructions = instructions.map(instruction => instruction.split("move ").join(" ").split(" from ").join(" ").split(" to ").join(" ").split(" ").slice(1, instruction.length))
        console.log(readableLayout)
        instructions.forEach((instr, index) => {
            let [volume, from, to] = instr
            volume = parseInt(volume)
            from = parseInt(from)-1
            to = parseInt(to)-1
            let change = readableLayout[from].slice(0, volume)
            readableLayout[from] = readableLayout[from].slice(volume, readableLayout[from].length)
            change = change.reverse()
            change.forEach((item) => {
                readableLayout[to].unshift(item)
            })
            console.log(readableLayout)
        })

        let final = ""
        readableLayout.forEach((row) => {
            final += row[0][1]
        })
        console.log(final)
    })
}
moveStacks()