const CareerPath = require('../models/career_path');
const Skill = require('../models/skill');

const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.careerpath_list = (req, res, next) => {
  CareerPath.find((err, results) => {
    if (err) {
      return next(err);
    }
    res.render('careerpath_list', {
      title: 'All Careers Are Listed Here',
      data: results,
    });
    console.log(results);
  });
};
exports.careerpath_detail = (req, res, next) => {
  async.parallel(
    {
      career: (callback) => {
        CareerPath.findById(req.params.id).exec(callback);
      },
      skills: (callback) => {
        Skill.find({ career_path: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render('careerpath_detail', {
        title: 'Detail Page',
        career: results.career,
        skills: results.skills,
      });
    }
  );
};
exports.careerpath_create_get = (req, res) => {
  res.render('careerpath_form', { title: 'New Career Path Create Form' });
};
exports.careerpath_create_post = [
  //validate
  body('name', 'name must be specified').trim().isLength({ min: 1 }),
  body('description', 'description must be specified')
    .trim()
    .isLength({ min: 2 }),

  sanitizeBody('*').escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a Book object with escaped and trimmed data.
    var careerPath = new CareerPath({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('careerpath_form', {
        title: 'New Career Path Create Form Again',
        data: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      careerPath.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(careerPath.url);
      });
    }
  },
];

exports.careerpath_update_get = (req, res, next) => {
  CareerPath.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }
    res.render('careerpath_form', { title: 'Update The Path', data: results });
  });
};
exports.careerpath_update_post = [
  //validate
  body('name', 'name must be specified').trim().isLength({ min: 1 }),
  body('description', 'description must be specified')
    .trim()
    .isLength({ min: 2 }),

  sanitizeBody('*').escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a Book object with escaped and trimmed data.
    var careerPath = new CareerPath({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('careerpath_form', {
        title: 'Update The Path Again',
        data: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      CareerPath.findByIdAndUpdate(req.params.id, careerPath, {}, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect(careerPath.url);
      });
    }
  },
];
exports.careerpath_delete_get = (req, res, next) => {
  async.parallel(
    {
      career: (callback) => {
        CareerPath.findById(req.params.id).exec(callback);
      },
      skills: (callback) => {
        Skill.find({ career_path: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.career === null) {
        res.redirect('/career-paths');
      } else {
        res.render('careerpath_delete', {
          title: 'Delete ' + results.career.name + ' path',
          career: results.career,
          skills: results.skills,
        });
      }
    }
  );
};
exports.careerpath_delete_post = function (req, res, next) {
  async.parallel(
    {
      career: (callback) => {
        CareerPath.findById(req.params.id).exec(callback);
      },
      skills: (callback) => {
        Skill.find({ career_path: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.skills.length > 0) {
        //some skills have this category. they must be deleted first
        res.render('careerpath_delete', {
          title: 'Delete ' + results.career.name + ' path',
          career: results.career,
          skills: results.skills,
        });
      } else {
        //skills don't include this category. can be deleted
        CareerPath.findByIdAndRemove(req.params.id, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/career-paths');
        });
      }
    }
  );
};
