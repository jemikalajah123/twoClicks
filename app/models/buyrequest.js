const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const BuyrequestSchema = new mongoose.Schema({
  phoneName: {
    type: String,
    required: true
  },
  storageSize: {
    type: String,
    required: true,
  },
  New: {
    type: String,
    required: true,
  },
  A1: {
    type: String,
    required: true,
  },
  A2: {
    type: String,
    required: true,
  },
  B1: {
    type: String,
    required: true,
  },
  B2: {
    type: String,
    required: true,
  },
  C: {
    type: String,
    required: true,
  },
  CB: {
    type: String,
    required: true,
  },
  CD: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

BuyrequestSchema.plugin(mongoosePaginate)

module.exports = Buyrequest = mongoose.model('buyrequest', BuyrequestSchema);