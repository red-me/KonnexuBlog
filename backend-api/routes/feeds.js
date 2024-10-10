
const express = require('express')
const path = require('path')


var router = express.Router();


const { prisma } = require("../services/prisma/db")

const User = prisma.user;
const Profile = prisma.profile;

//auth thingy
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const activities = await prisma.activity.findMany({
        where: {},

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
                }
            }
        },
        orderBy: {
            updatedAt: 'desc',
        },
    })
    res.json(activities)
})




module.exports = router;
