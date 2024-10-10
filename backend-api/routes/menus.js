
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
    const apps = await prisma.menu.findMany({
        where: {},
        orderBy: {
            name: 'desc',
        },
    })
    res.json(apps)
})


router.post('/query', async (req, res) => {

    try {
        const { query } = req.body


        var q = query

        const results = await prisma.menu.findMany(q);

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
        const mutate = prisma.menu[type == 'create' ? 'create' : 'update']

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

        const results = await prisma.menu.count(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})




module.exports = router;
