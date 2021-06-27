const express = require('express')
const router = express.Router()
const advancedResults = require('../middlewares/advancedResults')
const Business = require('../models/Business')
const { getBusinesses, createBusiness } = require('../controllers/business')

router.route('/')
  .get(advancedResults(Business), getBusinesses)
  .post(createBusiness)

module.exports = router