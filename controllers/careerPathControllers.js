const CareerPath = require('../models/career_path');

exports.careerpath_list = (req, res, next) => {
  CareerPath.find((err, results) =>{
    if (err){return next(err)}
    res.render('careerpath_list', {title: 'All Careers Are Listed Here', data:results})
    console.log(results)
  })
 
}
exports.careerpath_detail = (req, res) => {
  res.send('careerpath detail'+this._id)
}
exports.careerpath_create_get = (req, res) => {
  res.send('careerpath create get')
}
exports.careerpath_create_post = (req, res) => {
  res.send('careerpath create post')
}

exports.careerpath_update_get = (req, res) => {
  res.send('careerpath update get')
}
exports.careerpath_update_post = (req, res) => {
  res.send('careerpath update post')
}
exports.careerpath_delete_get = (req, res) => {
  res.send('careerpath delete get')
}
exports.careerpath_delete_post = (req, res) => {
  res.send('careerpath delete post')
}