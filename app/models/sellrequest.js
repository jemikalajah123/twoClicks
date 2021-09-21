const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const SellrequestSchema = new mongoose.Schema({
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

SellrequestSchema.plugin(mongoosePaginate)

module.exports = Sellrequest = mongoose.model('sellrequest', SellrequestSchema);