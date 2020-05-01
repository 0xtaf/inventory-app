const Skill = require('../models/skill');

exports.skill_list = (req, res) => {
  res.send(" skill list will be implemented ")
}

exports.skill_detail = (req,res) => {
  res.send("skill detail "+ this._id)
}

exports.skill_create_get = (req, res) =>{
  res.send('skill create get')
}
exports.skill_create_post = (req, res) =>{
  res.send('skill create post')
}
exports.skill_delete_get = (req, res) =>{
  res.send('skill delete get')
}
exports.skill_delete_post = (req, res) =>{
  res.send('skill delete post')
}
exports.skill_update_get = (req, res) =>{
  res.send('skill update get')
}
exports.skill_update_post = (req, res) =>{
  res.send('skill update post')
}