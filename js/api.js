import express from 'express'
import { PrismaClient } from '@prisma/client'

import { writeLog, clearObject }  from './functions.js'
import multerStorage from './multer.js'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/allResedent', async (req, res) => {
    if (req.query?.tag) {
        await prisma.resedent.findMany({
            select: {
                id: true,
                img: true,
                name: true,
                tagresenent: true
            },
            where: {
                tagresenent: {
                    some: {
                        name: req.query.tag
                    }
                }
            }
        })
        .then(o => {
            res.status(200).send(o)
        })
    }else {
        await prisma.resedent.findMany({
            select: {
                id: true,
                img: true,
                name: true,
                tagresenent: true
            }
        })
        .then(o => {
            res.status(200).send(o)
        })
    }
})

router.post('/resedent', multerStorage.single('file'), async (req, res) => {
    let data = req.body
    data.img = req.file.filename
    await prisma.resedent.create({
        data
    })
    .then(o => {
        writeLog(`create resedent`, {obj: o})
        res.status(200).send(o)
    })
    .catch(e => {
        writeLog(`error create resedent`, {err: e})
        res.sendStatus(400)
    })
})

router.route('/resedent/:id')
    .get(async (req, res) => {
        await prisma.resedent.findFirst({
            include: {
                tagresenent: true
            },
            where: {
                id: Number(req.params.id)
            }
        })
        .then(o => {
            if(o) {
                res.status(200).send(o)
            }else {
                res.sendStatus(404)
            }
        })
    })
    .delete(async (req, res) => {
        await prisma.resedent.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(o => {
            writeLog(`delete resedent`, {obj: o})
            res.status(200).send(o)
        })
        .catch(e => {
            writeLog(`error delete resedent`, {err: e})
            res.status(400).send(e)
        })
    })
    .put(async (req, res) => {
        await prisma.resedent.update({
            where: {
                id: Number(req.params.id)
            },
            data: clearObject(req.body)
        })
        .then(o => {
            writeLog(`edite resedent on`, {obj: o})
            res.status(200).send(o)
        })
        .catch(e => {
            writeLog(`error edite resedent`, {err: e})
            res.status(400).send(e)
        })
    })

router.route('/tagOnResedent/:id')
    .get(async (req, res) => {
        await prisma.tagresenent.findMany({
            where: {
                resedent: {
                    some: {
                        id: Number(req.params.id)
                    }
                }
            }
        })
    })
    .delete(async(req, res) => {
        await prisma.resedent.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                tagresenent: {
                    disconnect: req.body.map(o => {
                        return {id:o}
                    })
                }
            }
        })
    })
    .put(async(req, res) => {
        await prisma.resedent.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                tagresenent: {
                    connect: req.body.map(o => {
                        return {id:o}
                    })
                }
            }
        })
    })

router.get('/allTag', async (req, res) => {
    await prisma.tagresenent.findMany()
    .then(o => {
        res.status(200).send(o)
    })
})

router.post('/tag', async (req,res) => {
    await prisma.tagresenent.create({
        data: clearObject(req.body)
    })
    .then(o => {
        writeLog(`create tag`, {obj: o})
        res.status(200).send(o)
    })
    .catch(e => {
        writeLog(`error create tag`, {err: e})
        res.status(400).send(e)
    })
})

router.route('/tag/:id')
    .get(async (req, res) => {
        await prisma.tagresenent.findFirst({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(o => {
            if (o) {
                res.status(200).send(o)
            }else {
                res.sendStatus(404)
            }
        })
    })
    .delete(async (req, res) => {
        await prisma.tagresenent.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(o => {
            writeLog(`delete tag`, {obj: o})
            res.status(200).send(o)
        })
        .catch(e => {
            writeLog(`error delete tag`, {err: e})
            res.status(400).send(e)
        })
    })
    .put(async (req, res) => {
        await prisma.tagresenent.update({
            where: {
                id: Number(req.params.id)
            },
            data: clearObject(req.body)
        })
        .then(o => {
            writeLog(`edite tag on`, {obj: o})
            res.status(200).send(o)
        })
        .catch(e => {
            writeLog(`error edite tag`, {err: e})
            res.status(400).send(e)
        })
    })

export default router