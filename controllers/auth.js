const asyncHandler = require('../middlewares/asyncHandler')
const User = require('../models/User')


// @desc  Register a user
//@route  POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {

  const { firstName, lastName, email, password, role } = req.body

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role
  })

  sendTokenResponse(user, 201, res)
})

// @desc  Get a logged in user
//@route  Get /api/v1/auth/me
//@access Public
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user

  if (!user) return next(new ErrorResponse(`No user with the id of ${req.params.id}`, 400))

  res.status(200).json({
    success: true,
    data: user
  })
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }


  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token: token
    })
}