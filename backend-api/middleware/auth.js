const jwt = require('jsonwebtoken');
const config = require('config');



const { prisma } = require("../services/prisma/db")

const User = prisma.user;


module.exports = function (req, res, next) {

  // Get token from header
  //const token = req.header('x-auth-token');
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).json({ msg: 'No token, authorization denied(0)' });
  }
  const token = authorization.substr(7);
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {


        User.findFirst({
          where: {
            sessionToken: decoded.v
          },

        }).then(user => {
          if (user) {
            req.userId = user.id;


            const updatedUser = User.update({
              where: { id: user.id },
              data: {
                lastActivity: new Date(),
                lastIPAddress: req.ip
              }
            }).then(updatedUser => {

              console.log(updatedUser)
            })




            next();
          }
          else {
            return res.status(401).json({ msg: 'Session expired' });
          }
        }
        ).catch(next)

      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
