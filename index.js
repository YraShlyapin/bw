import express from 'express'
import { writeLog, getAllFileName } from './js/functions.js'

import api from './js/api.js'
import middleware from './js/middleware.js'

import path from 'path'
import 'dotenv/config'

const __dirname = path.resolve()

const app = express()
const port = process.env.PORT || 8080
const host = process.env.HOST || 'localhost'

app.use(middleware)

app.use('/api', api)

app.use('/image', express.static(path.join(__dirname, 'image')))

app.get('/image', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.write('<div style="display: flex;flex-wrap: wrap;justify-content: space-evenly;">')
    for (let file of getAllFileName()) {
        res.write(`<a href="/image/${file}" style="text-decoration:none;color:black;display: flex;width: 300px;flex-direction: column;align-items: center;">
        <img width="100%" src="/image/${file}">
        <p>${file}</p>
        </a>`)
    }
    res.write('</div>')
})

app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`server start on http://${host}:${port}/api/allResedent`)
    //writeLog(`server start on http://${host}:${port}/`)
})

//add multer