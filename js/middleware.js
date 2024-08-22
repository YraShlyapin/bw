import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const middleware = express.Router()

middleware.use(cors())
middleware.use(bodyParser.urlencoded({ extended: false }))
middleware.use(bodyParser.json())

export default middleware