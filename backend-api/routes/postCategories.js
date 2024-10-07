
const express = require('express')


var router = express.Router();


const { prisma } = require("../services/prisma/db")

router.post('/query', async (req, res) => {
    try {
        const { query } = req.body

       
        var q = query
       
        const results = await prisma.postCategory.findMany(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})


module.exports = router;
