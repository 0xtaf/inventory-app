const Skill = require('../models/skill');
const CareerPath = require('../models/career_path');

const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
    res.render('skill_form', { title: 'New Skill Create Form', careerPath: results });
  });
};
exports.skill_create_post = [
  //validate
  body('name', 'name must be specified').trim().isLength({ min: 1 }),
  body('description', 'description must be specified')
    .trim()
    .isLength({ min: 2 }),
  body('career_path', 'career path must be between 0 and 10000')
    .trim()
    .isLength({ min: 1 }),
  body('price', 'price must be specified').trim().isInt({ gt: 0, lt: 10000 }),
  body('numInStock', 'stock number must be between 0 and 1000')
    .trim()
    .isInt({ gt: 0, lt: 1000 }),

  sanitizeBody('*').escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var skill = new Skill({
      name: req.body.name,
      description: req.body.description,
      career_path: req.body.career_path,
      price: req.body.price,
      numInStock: req.body.numInStock,
    });
    
    if (!errors.isEmpty()) {
      CareerPath.find({}).exec((err, results) => {
        if (err) {
          return next(err);
        }
        
        res.render('skill_form', {
          title: 'New Skill Create Form Again',
          careerPath: results,
          skill: skill,
          errors: errors.array()
        });
      });
      return;
    } else {
      skill.save(function (err){
        if (err) {return next(err)}
        res.redirect(skill.url)
      })
    }
  },
];
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
  async.parallel(
    {
      skill: (callback) => {
        Skill.findById(req.params.id).exec(callback);
      },
      careerPaths: (callback) => {
        CareerPath.find({}, 'name').exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render('skill_form', {
        title: 'update the skill',
        skill: results.skill,
        careerPath: results.careerPaths,
      });
    }
  );
};
exports.skill_update_post = [
  //validate
  body('name', 'name must be specified').trim().isLength({ min: 1 }),
  body('description', 'description must be specified')
    .trim()
    .isLength({ min: 2 }),
  body('career_path', 'career path must be between 0 and 10000')
    .trim()
    .isLength({ min: 1 }),
  body('price', 'price must be specified').trim().isInt({ gt: 0, lt: 10000 }),
  body('numInStock', 'stock number must be between 0 and 1000')
    .trim()
    .isInt({ gt: 0, lt: 1000 }),

  sanitizeBody('*').escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var skill = new Skill({
      name: req.body.name,
      description: req.body.description,
      career_path: req.body.career_path,
      price: req.body.price,
      numInStock: req.body.numInStock,
      _id: req.params.id,
    });
    
    if (!errors.isEmpty()) {
      CareerPath.find({}).exec((err, results) => {
        if (err) {
          return next(err);
        }
        
        res.render('skill_form', {
          title: 'New Skill Create Form Again',
          careerPath: results,
          skill: skill,
          errors: errors.array()
        });
      });
      return;
    } else {
      Skill.findByIdAndUpdate(req.params.id, skill, {}, (err, theskill)=>{
        if (err){return next(err)}
        res.redirect(skill.url);
      })
    }
  },
]
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
