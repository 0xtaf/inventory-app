#! /usr/bin/env node

console.log(
  'This script populates some items and categories to my db. Specified database as argument - e.g.: populatedb mongodb+srv://username:userpassword@cluster0-mbdj7.mongodb.net/dbname?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');

var CareerPath = require('./models/career_path');
var Skill = require('./models/skill');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var careerPaths = [];
var skillsx = [];

function careerPathCreate(name, description, cb) {
  careerPathDetail = {
    name: name,
    description: description,
  };

  var careerPath = new CareerPath(careerPathDetail);

  careerPath.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New CareerPath: ' + careerPath);
    careerPaths.push(careerPath);
    cb(null, careerPath);
  });
}

function skillCreate(name, description, career_path, price, numInStock, cb) {
  skillDetail = {
    name: name,
    description: description,
    career_path: career_path,
    price: price,
    numInStock: numInStock,
  };

  var skill = new Skill(skillDetail);
  skill.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Skill: ' + skill);
    skillsx.push(skill);
    cb(null, skill);
  });
}

function createCareerPaths(cb) {
  async.parallel(
    [
      function (callback) {
        careerPathCreate(
          'Backend Development',
          'Backend development (also stylized as back-end or back end development) is the skill that powers the web. Yet it does it modestly, without fanfare—allowing people to browse their favorite sites without even knowing about all the work put in by the backend developer or team.',
          callback
        );
      },
      function (callback) {
        careerPathCreate(
          'Frontend Development',
          'If you look at any site, almost anything you can see on the front-end, from the page layout to the navigation menus, have probably been designed by a front-end developer.',
          callback
        );
      },
      function (callback) {
        careerPathCreate(
          'Mobile Development',
          "Mobile developers are professionals who create software applications, optimized for mobile devices. They specialize in building apps for Apple's iOS, Google's Android or Microsoft's Windows platforms.",
          callback
        );
      },
      function (callback) {
        careerPathCreate(
          'UI/UX design',
          'User experience (UX) refers to any interaction a user has with a product or service. UX design considers each and every element that shapes this experience, how it makes the user feel, and how easy it is for the user to accomplish their desired tasks. UI design is the look and feel, the presentation and the interactivity of a product.',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createSkills(cb) {
  async.parallel(
    [
      function (callback) {
        skillCreate(
          'PHP',
          'A popular general-purpose scripting language that is especially suited to web development',
          careerPaths[0],
          2999,
          15,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Node.js',
          'an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.',
          careerPaths[0],
          2499,
          24,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'MongoDB',
          'A cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.',
          careerPaths[0],
          999,
          52,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'MySQL',
          'an open-source relational database management system (RDBMS)',
          careerPaths[0],
          999,
          60,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'React',
          'a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
          careerPaths[1],
          2799,
          35,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Vue',
          'An open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.It was created by Evan You, and is maintained by him and the rest of the active core team members coming from various companies such as Netlify and Netguru.',
          careerPaths[1],
          2799,
          42,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Sass',
          "Sass (which stands for 'Syntactically awesome style sheets' is an extension of CSS that enables you to use things like variables, nested rules, inline imports and more.",
          careerPaths[1],
          599,
          74,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Webpack',
          'webpack is an open-source JavaScript module bundler. It is a module bundler primarily for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding loaders are included. webpack takes modules with dependencies and generates static assets representing those modules',
          careerPaths[1],
          450,
          115,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'React-Native',
          'React Native is an open-source mobile application framework created by Facebook. It is used to develop applications for Android, iOS, Web and UWP by enabling developers to use React along with native platform capabilities.',
          careerPaths[2],
          2500,
          24,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Flutter',
          'Flutter is an open-source UI software development kit created by Google. It is used to develop applications for Android, iOS, Windows, Mac, Linux, Google Fuchsia and the web.',
          careerPaths[2],
          2900,
          12,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Xamarin',
          'With a C#-shared codebase, developers can use Xamarin tools to write native Android, iOS, and Windows apps with native user interfaces and share code across multiple platforms, including Windows, macOS, and Linux.',
          careerPaths[2],
          2100,
          30,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Sketch',
          'Sketch is a vector graphics editor for macOS developed by the Dutch company Bohemian Coding.It is primarily used for user interface and user experience design of websites and mobile apps and does not include print design features',
          careerPaths[3],
          2750,
          39,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Marvel',
          "Marvel's design platform makes things easy. With the ability to create both low fidelity and hi-fi wireframes, interactive prototypes, and do user testing, it gives a UI designer everything they need",
          careerPaths[3],
          1750,
          65,
          callback
        );
      },
      function (callback) {
        skillCreate(
          'Figma',
          'Figma lets designers build dynamic prototypes and mockups, test them for usability, and sync up all of the progress. Figma allows multiple people to work on or view a project at the same time, much like Google Docs — letting you see who has it open for real-time collaboration.',
          careerPaths[3],
          2700,
          22,
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series([createCareerPaths, createSkills], function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    mongoose.connection.close();
  }
  // All done, disconnect from database
});
