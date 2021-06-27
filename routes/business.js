const express = require('express')
const router = express.Router()
const advancedResults = require('../middlewares/advancedResults')
const Business = require('../models/Business')
const { getBusinesses, getBusiness, createBusiness, updateBusiness, deleteBusiness } = require('../controllers/business')

router.route('/')
  .get(advancedResults(Business), getBusinesses)
  .post(createBusiness)

router.route('/:id')
  .get(getBusiness)
  .put(updateBusiness)
  .delete(deleteBusiness)

module.exports = router