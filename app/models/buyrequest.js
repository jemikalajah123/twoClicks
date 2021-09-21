const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const BuyrequestSchema = new mongoose.Schema({
  data: {
    type: Object
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