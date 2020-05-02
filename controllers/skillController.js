const Skill = require('../models/skill');
const CareerPath = require('../models/career_path');

const async = require('async');

exports.index = function (req, res) {
  async.parallel(
    {
      career_count: (callback) => {
        CareerPath.countDocuments({}, callback);
      },
      skill_count: (callback) => {
        Skill.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render('index', {
        title:
          'Buy the best skills you want from this marvellous career paths!',
        error: err,
        data: results,
      });
    }
  );
};

exports.skill_list = (req, res, next) => {
  Skill.find({}, 'name description')
    .populate('career_path')
    .exec((err, results) => {
      if (err) {
        return next(err);
      }
      res.render('skill_list', {
        title: 'All The Skills You Need Are Only One Click Away!',
        data: results,
      });
      console.log(results);
    });
};

exports.skill_detail = (req, res, next) => {
  Skill.findById(req.params.id)
    .populate('career_path')
    .exec((err, results) => {
      if (err) {
        return next(err);
      }
      res.render('skill_detail', { title: 'Skill Detail Page', data: results });
    });
};

exports.skill_create_get = (req, res, next) => {
  CareerPath.find({}, 'name').exec((err, results) => {
    if (err) {
      return next(err);
    }
    res.render('skill_form', { title: 'New Skill Create Form', data: results });
  });
};
exports.skill_create_post = (req, res) => {
  res.send('skill create post');
};
exports.skill_delete_get = (req, res, next) => {
  Skill.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }
    res.render('skill_delete', {
      title: 'Delete The ' + results.name + ' Skill',
      data: results,
    });
  });
};
exports.skill_delete_post = (req, res) => {
  res.send('skill delete post');
};
exports.skill_update_get = (req, res, next) => {
  async.parallel({
    skill: (callback) =>{
      Skill.findById(req.params.id).exec(callback)
    },
    careerPaths: (callback)=>{
      CareerPath.find({}, 'name').exec(callback)
    }
  }, 
  (err, results)=>{
    if (err){return next(err)}
    res.render('skill_form', {title: 'update the skill', skill:results.skill, careerPaths: results.careerPaths})
  })
};
exports.skill_update_post = (req, res) => {
  res.send('skill update post');
};
exports.skill_buy_get = (req, res, next) => {
  Skill.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }
    res.render('skill_buy_form', {
      title: 'Buy ' + results.name + ' Chip Now!',
      data: results,
    });
  });
};
exports.skill_buy_post = (req, res) => {
  res.send('skill buy post');
};
