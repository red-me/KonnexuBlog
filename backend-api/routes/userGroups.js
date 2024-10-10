
const express = require('express')
const path = require('path')
const { rateLimit3x10 } = require("../middleware/ratelimit");
const { createId } = require('@paralleldrive/cuid2');
var router = express.Router();


const { prisma } = require("../services/prisma/db")

const UserGroup = prisma.userGroup;




const { delay } = require("../utils/utilities")


const auth = require('../middleware/auth');

const { encrypt, compare } = require('../utils/crypt')


router.post('/query', async (req, res) => {

    try {
        const {  query } = req.body

       
        var q = query
       
        const results = await UserGroup.findMany(q);

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
        const mutate = UserGroup[type == 'create' ? 'create' : 'update']

        const results = await mutate(query);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})

//separate the delete mutation from create and update 
router.post('/delete', async (req, res) => {

    try {
        const {  query } = req.body

       
        // make sure its either create or update only for now.
        const deleteUserGroup = UserGroup['delete']

        const results = await deleteUserGroup(query);

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

        const results = await UserGroup.count(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})



router.delete('/:id', async (req, res) => {

    const { id } = req.params
    const record = await UserGroup.delete({
        where: {
            id,
        },
    })
    res.json(record)
})





module.exports = router;
