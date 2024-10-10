
const express = require('express')
const path = require('path')


var router = express.Router();


const { prisma } = require("../services/prisma/db")


//auth thingy
/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 */


const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const apps = await prisma.theme.findMany({
        where: {},
        orderBy: {
            name: 'desc',
        },
    })
    res.json(apps)
})

router.get('/default', async (req, res) => {
    const theme = await prisma.theme.findFirst({
        where: { name: 'Default' },

    })
    res.json(theme)
})
router.get('/current', async (req, res) => {
    const siteSetting = await prisma.siteSetting.findFirst({ include: { theme: true } })
    res.json(siteSetting.theme)
})

router.post('/', async (req, res) => {
    const { name,
        url,
        scope,
        modules,
        settings } = req.body

    //await delay(3000)

    const doc = await prisma.theme.create({
        data: {
            name,
            url,
            scope,
            modules: JSON.parse(modules),
            settings: JSON.parse(settings)
        },
    })
    res.json(doc)

})



router.post('/query', async (req, res) => {

    try {
        const { query } = req.body


        var q = query

        const results = await prisma.theme.findMany(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})

router.post('/mutate', async (req, res) => {

    try {
        const { type, query } = req.body


        // make sure its either create or update only for now.
        const mutate = prisma.theme[type == 'create' ? 'create' : 'update']

        const results = await mutate(query);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})


router.post('/count', async (req, res) => {

    try {
        const { query } = req.body


        var q = query

        const results = await prisma.theme.count(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})

router.post('/use', async (req, res) => {

    try {
        const { previousId, id } = req.body


        const results = await prisma.siteSetting.update({
            where: { themeId: previousId, },
            data: { themeId: id },
            include: {
                theme: true
            }
        })

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})


module.exports = router;
