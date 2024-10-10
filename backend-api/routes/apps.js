
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
    const apps = await prisma.app.findMany({
        where: {},
        orderBy: {
            name: 'desc',
        },
    })
    res.json(apps)
})

router.post('/', async (req, res) => {
    const { name,
        url,
        scope,
        modules,
        settings } = req.body

    //await delay(3000)

    const doc = await prisma.app.create({
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
        const {  query } = req.body

       
        var q = query
       
        const results = await prisma.app.findMany(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})

router.post('/mutate', async (req, res) => {

    try {
        const {  type, query } = req.body

       
        // make sure its either create or update only for now.
        const mutate = prisma.app[type == 'create' ? 'create' : 'update']

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

        const results = await prisma.app.count(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})




module.exports = router;
