import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { writeLog } from './js/functions.js'
import api from './js/api.js'

import path from 'path'
import 'dotenv/config'

const __dirname = path.resolve()

const app = express()
const port = process.env.PORT || 8080
const host = process.env.HOST || 'localhost'

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/image', express.static(path.join(__dirname, 'image')))

app.use('/api', api)

app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`server start on http://${host}:${port}/api/allResedent`)
    //writeLog(`server start on http://${host}:${port}/`)
})