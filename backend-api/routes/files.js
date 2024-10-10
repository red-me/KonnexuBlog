const express = require('express')
const path = require('path')

var router = express.Router();

// These urls should later be protected from unauthorized users///
router.use('/apps', express.static(path.join(__dirname, '..', 'protected/apps')))
router.use('/plugins', express.static(path.join(__dirname, '..', 'protected/plugins')))
router.use('/themes', express.static(path.join(__dirname, '..', 'protected/themes')))
router.use('/profiles', express.static(path.join(__dirname, '..', 'protected/profiles')))



module.exports = router;