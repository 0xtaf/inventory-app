const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CareerPathSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
});

CareerPathSchema.virtual('url').get(function () {
  return '/career-path/' + this._id;
});

module.exports = mongoose.model('CareerPath', CareerPathSchema);
