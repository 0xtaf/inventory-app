const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  career_path: {type: Schema.Types.ObjectId, ref: 'CareerPath', required:true},
  price: {type: Number, required: true},
  numInStock: {type: Number, min:0, max:1000, required: true},
});

SkillSchema.virtual('url').get(function () {
  return '/skill/' + this._id;
});

module.exports = mongoose.model('Skill', SkillSchema);
