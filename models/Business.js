const mongoose = require('mongoose')
const slugify = require('slugify')
const geoCoder = require('../utils/geoCoder')


const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name of your business'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP ot HTTPS'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  createdAt: {
    type: Date,
    deault: Date.now
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

//Create business slug from the name
BusinessSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

//Geocode & create location field
BusinessSchema.pre('save', async function (next) {
  const loc = await geoCoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  //Do not save address in db
  this.address = undefined
  next()
})

module.exports = mongoose.model('Business', BusinessSchema)