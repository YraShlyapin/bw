import fs from 'fs'
import path from 'path'
import 'dotenv/config'

export function writeLog(text, {obj = {}, err = ''}) {
    let logMessage = new Date() + ' ' + text
    if (Object.keys(obj).length) {
        logMessage += ' ' + JSON.stringify(obj)
    }
    if (err) {
        logMessage += '\n' + err
    }
    logMessage += '\n'
    let pathToFile = path.join(path.resolve(), process.env.NAME_LOG || 'log.log')
    fs.appendFileSync(pathToFile, logMessage)
}

export function clearObject(obj) {
    return Object.fromEntries(Object.entries(obj)
    .filter(([k,v]) => {
        return v != null && v != ''
    }))
}