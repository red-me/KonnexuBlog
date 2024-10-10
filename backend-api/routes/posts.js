
const express = require('express')


var router = express.Router();


const { prisma } = require("../services/prisma/db")



const { delay } = require("../utils/utilities")



router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        where: { published: true },

        include: {

            author: {

                select: {
                    password: false,
                    email: true,
                    profile: true,
                }
            }
        },
        orderBy: {
            updatedAt: 'desc',
        },
    })
    res.json(posts)
})

router.post('/', async (req, res) => {
    const { title, type, content, authorEmail } = req.body

    //await delay(3000)

    const post = await prisma.post.create({
        data: {
            title,
            type,
            content,
            published: true /* false */,
            author: { connect: { email: authorEmail } },
        },
    })



    const activity = await prisma.activity.create({
        data: {

            type: 'Shared a ' + type,

            post: { connect: { id: post.id } },
        },
    })

    const activityFromDB = await prisma.activity.findFirst({
        where: { id: activity.id },
        include: {
            post: {
                include: {

                    author: {

                        select: {
                            password: false,
                            email: true,
                            profile: true,
                        }
                    }
                },
            }
        }


    })


    res.json(activityFromDB)
})

router.post('/publish', async (req, res) => {
    // const { id } = req.params
    const { id } = req.body
    const post = await prisma.post.update({
        where: { id },
        data: { published: true },
    })
    res.json(post)
})


router.post('/count', async (req, res) => {

    try {
        const { document, query } = req.body

        const doc = prisma[document];


        var q = query

        const results = await doc.count(q);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})


router.post('/query', async (req, res) => {

    try {
        const { document, query } = req.body

        const doc = prisma[document];

        var q = query
       /*  try {
            q = (JSON.parse(query))
        } catch (error) {
            q = query
        } */
 

       /*  console.log("================================")
        console.log("SELECT * ")
        console.log(q)
        console.log("FROM ", document) */
        const results = await doc.findMany(q);

        

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})

router.post('/mutate', async (req, res) => {

    try {
        const { document, type, query } = req.body

        const doc = prisma[document];

        // make sure its either create or update only for now.
        const mutate = doc[type == 'create' ? 'create' : 'update']

        const results = await mutate(query);

        res.json(results)
    }
    catch (e) {
        res.status(200).json({ error: e.message })
    }
})




module.exports = router;
