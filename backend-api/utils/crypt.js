
const bcrypt = require("bcryptjs")


async function encrypt(password) {
  return bcrypt.hash(password, 10)
}


async function compare(password, encrypted) {
  return bcrypt.compare(password, encrypted);
}

module.exports = {
  encrypt,
  compare
}