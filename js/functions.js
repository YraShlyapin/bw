import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const __dirname = path.resolve()

export function writeLog(text, {obj = {}, err = ''}) {
    let logMessage = formatData(new Date()) + ' ' + text
    if (Object.keys(obj).length) {
        logMessage += ' ' + JSON.stringify(obj)
    }
    if (err) {
        logMessage += '\n' + err
    }
    logMessage += '\n'
    let pathToFile = path.join(__dirname, process.env.NAME_LOG || 'log.log')
    fs.appendFileSync(pathToFile, logMessage)
}

export function getAllFileName() {
    return fs.readdirSync(path.join(__dirname, 'image'))
}

export function clearObject(obj) {
    return Object.fromEntries(Object.entries(obj)
    .filter(([k,v]) => {
        return v != null && v != ''
    }))
}

function formatData(data) {
    return `${data.getFullYear()} ${data.getMonth()+1} ${data.getDate()} ${[data.getHours(),data.getMinutes(),data.getSeconds()].join(':')}`
}