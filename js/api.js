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

router.post('/resedent', multerStorage.single('avatar'), async (req, res) => {
    let data = clearObject(req.body)
    if (req.file) {
        data.img = req.file.filename
    }
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
            .catch(e => res.status(400).send(e))
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
    .put(multerStorage.single('avatar'), async (req, res) => {
        let data = clearObject(req.body)
        if (req.file) {
            data.img = req.file
        }
        await prisma.resedent.update({
            where: {
                id: Number(req.params.id)
            },
            data
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
            .then(o => res.status(200).send(o))
            .catch(e => res.status(400).send(e))
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
            .then(o => {
                writeLog(`delete tag from resedent`, {obj: o})
                res.status(200).send(o)
            })
            .catch(e => {
                writeLog(`error delete tag from reseden`, {err: e})
                res.status(400).send(e)
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
            .then(o => {
                writeLog(`add tag on reseden`, {obj: o})
                res.status(200).send(o)
            })
            .catch(e => {
                writeLog(`error add tag on reseden`, {err: e})
                res.status(400).send(e)
            })
    })



router.get('/allTag', async (req, res) => {
    await prisma.tagresenent.findMany()
        .then(o => {res.status(200).send(o)})
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
            .catch(e => res.status(400).send(e))
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



router.get('/allPrivilege', async (req, res) => {
    await prisma.privilege.findMany()
        .then(o => res.status(200).send(o))
})

router.post('/privilege', async (req, res) => {
    await prisma.privilege.create({
        data: req.body
    })
        .then(o => {
            writeLog(`create privilege`, {obj: o})
            res.status(200).send(o)
        })
        .catch(e => {
            writeLog(`error create privilege`, {err: e})
            res.status(400).send(e)
        })
})

router.route('/privilege/:id')
    .get(async (req, res) => {
        await prisma.privilege.findFirst({
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
            .catch(e => res.status(400).send(e))
    })
    .delete(async (req, res) => {
        await prisma.privilege.delete({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                writeLog(`delete privilege`, {obj: o})
                res.status(200).send(o)
            })
            .catch(e => {
                writeLog(`error delete privilege`, {err: e})
                res.status(400).send(e)
            })
    })
    .put(async (req, res) => {
        await prisma.privilege.update({
            where: {
                id: Number(req.params.id)
            },
            data: clearObject(req.body)
        })
            .then(o => {
                writeLog(`edite privilege`, {obj: o})
                res.status(200).send(o)
            })
            .catch(e => {
                writeLog(`error edite privilege`, {err: e})
                res.status(400).send(e)
            })
    })



router.get('/tagOnPrivilege', async (req, res) => {
    await prisma.privilege.findMany()
        .then(o => {
            let all = o.reduce((acc, now) => {
                if (!acc.includes(now.tag)) {
                    acc.push(now.tag)
                }
                return acc
            },[])
            res.status(200).send(all)
        })
})



router.get('/allProject', async (req, res) => {
    await prisma.project.findMany()
        .then(o => res.status(200).send(o))
})

router.post('/project', async (req, res) => {
    await prisma.project.create({
        data: clearObject(req.body)
    })
        .then(o => {
            writeLog(`create project`, {obj: o})
            res.status(200).send(o)
        })
        .catch(e => {
            writeLog(`error create project`, {err: e})
            res.status(400).send(e)
        })
})

router.route('/project/:id')
    .get(async (req, res) => {
        await prisma.project.findFirst({
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
            .catch(e => res.status(400).send(e))
    })
    .delete(async (req, res) => {
        await prisma.project.delete({
            where: {
                id: Number(req.params.id)
            }
        })
            .then(o => {
                writeLog(`delete project`, {obj: o})
                res.status(200).send(o)
            })
            .catch(e => {
                writeLog(`error delete project`, {err: e})
                res.status(400).send(e)
            })
    })
    .put(async (req, res) => {
        await prisma.project.update({
            where: {
                id: Number(req.params.id)
            },
            data: clearObject(req.body)
        })
            .then(o => {
                writeLog(`edite project`, {obj: o})
                res.status(200).send(o)
            })
            .catch(e => {
                writeLog(`error edite project`, {err: e})
                res.status(400).send(e)
            })
    })

export default router