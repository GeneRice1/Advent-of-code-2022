import fs from "fs"

const wins = {
    "A": "B",
    "B": "C",
    "C": "A"
}

const draws = {
    "A": "A",
    "B": "B",
    "C": "C"
}

const losses = {
    "A": "C",
    "B": "A",
    "C": "B"
}

const points = {
    "A": 1,
    "B": 2,
    "C": 3
}

fs.readFile("input.txt", "utf-8", (err, data) => {
    let lineData = data.split("\r\n")
    lineData = lineData.map(item => item.split(" "))
    let scores = lineData.map(fight => {
        let score = 0
        if (fight[1] == "X") {
            score = points[losses[fight[0]]]
            console.log(score)
        } else if (fight[1] == "Y") {
            score = points[draws[fight[0]]] + 3
        } else {
            score = points[wins[fight[0]]] + 6
        }
        return(score)
    })
    console.log(scores, scores.reduce((a, b) => a+b))
})