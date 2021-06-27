const asyncHandler = require('../middlewares/asyncHandler')
const Business = require('../models/Business')

// @desc  Create a business
//@route  POST /api/v1/business
//@access Private
exports.createBusiness = asyncHandler(async (req, res, next) => {

  const business = await Business.create(req.body)

  res.status(201).json({
    success: true,
    data: business
  })
})


// @desc  Get businesses
//@route  Get /api/v1/business
//@access Public
exports.getBusinesses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})
