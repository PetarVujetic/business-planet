const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middlewares/auth')

const { getMe, register } = require('../controllers/auth')


router.route('/register')
  .post(register)

router.route('/me')
  .get(protect, getMe)



module.exports = router