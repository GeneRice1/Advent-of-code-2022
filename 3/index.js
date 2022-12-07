import fs, { read } from "fs";

function getTotal() {
    let readData = []
    fs.readFile("input.txt", "utf-8", (err, data) => {
        readData = data.split("\n")
        readData = readData.map((item) => {
            return ([item.slice(0, item.length/2), item.slice(item.length/2, item.length)])
        })
        const values = readData.map((items) => {
            let itemList = items[0].split("")
            let found = []
            const duplicate = itemList.filter((item) => {
                if (!found.includes(item)) {
                    found.push(item)
                    return (items[1].includes(item))
                }
            })
            return(duplicate)
        })
        let final = 0
        values.forEach((item, index, list) => {
            const numVal = item[0] == item[0].toUpperCase() ? item[0].charCodeAt(0)-38 : item[0].charCodeAt(0)-96
            final += parseInt(numVal)
        })
        console.log(final)
    })
}

function getBadges() {
    let readData = []
    fs.readFile("input.txt", "utf-8", (err, data) => {
        readData = data.split("\n")
        let tripletData = []
        readData.forEach((item, index) => {
            if (tripletData[Math.floor(index / 3)]) { tripletData[Math.floor(index / 3)].push(item) }
            else { tripletData[Math.floor(index / 3)] = [item] }
        })
        let sharedVals = []
        tripletData.forEach((item, i) => {
            const splitStr = item[0].split("")
            splitStr.forEach((letter) => {
                if (letter != "\r" && item[1].includes(letter) && item[2].includes(letter)) {
                    !sharedVals[i] ? sharedVals.push([letter]) : null
                }
            })
        })
        console.log(sharedVals.length)
        sharedVals = sharedVals.map(letter => letter[0] == letter[0].toUpperCase() ? letter[0].charCodeAt(0) - 38 : letter[0].charCodeAt(0) - 96)
        console.log(sharedVals.length, sharedVals.reduce((a, b) => a+b))
    })
}

getBadges()