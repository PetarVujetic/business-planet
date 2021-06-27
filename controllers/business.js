const asyncHandler = require('../middlewares/asyncHandler')
const Business = require('../models/Business')
const ErrorResponse = require('../utils/errorResponse')

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

// @desc  Get business
//@route  Get /api/v1/business/:id
//@access Public
exports.getBusiness = asyncHandler(async (req, res, next) => {

  const business = await Business.findById(req.params.id)

  if (!business) return next(new ErrorResponse(`Business not found with the id of ${req.params.id}`, 400))

  res.status(200).json({
    success: true,
    data: business
  })
})

// @desc  Update a business
//@route  PUT /api/v1/business/:id
//@access Private
exports.updateBusiness = asyncHandler(async (req, res, next) => {

  const business = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!business) return next(new ErrorResponse(`No business with the id of ${req.params.id}`, 400))

  res.status(201).json({
    success: true,
    data: business
  })
})

// @desc  Delete a business
//@route  DELETE /api/v1/business/:id
//@access Private
exports.deleteBusiness = asyncHandler(async (req, res, next) => {

  const business = await Business.findByIdAndDelete(req.params.id)

  if (!business) return next(new ErrorResponse(`No business with the id of ${req.params.id}`, 400))

  res.status(200).json({
    success: true,
    data: {}
  })
})
