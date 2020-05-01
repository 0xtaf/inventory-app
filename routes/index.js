var express = require('express');
var router = express.Router();

//controllers
const careerpath_controller = require('../controllers/careerPathControllers');
const skill_controller = require('../controllers/skillController');

/* GET home page. */
router.get('/', skill_controller.index)


//careerpath routes
router.get('/career-path/create', careerpath_controller.careerpath_create_get)
router.post('/career-path/create', careerpath_controller.careerpath_create_post)

router.get('/career-path/:id/update', careerpath_controller.careerpath_update_get)
router.post('/career-path/:id/update', careerpath_controller.careerpath_update_post)

router.get('/career-path/:id/delete', careerpath_controller.careerpath_delete_get)
router.post('/career-path/:id/delete', careerpath_controller.careerpath_delete_post)

router.get('/career-path/:id', careerpath_controller.careerpath_detail)
router.get('/career-paths', careerpath_controller.careerpath_list)


//skill path
router.get('/skill/create', skill_controller.skill_create_get)
router.post('/skill/create', skill_controller.skill_create_post)
router.get('/skill/:id/delete', skill_controller.skill_delete_get)
router.post('/skill/:id/delete', skill_controller.skill_delete_post)
router.get('/skill/:id/update', skill_controller.skill_update_get)
router.post('/skill/:id/update', skill_controller.skill_update_post)
router.get('/skill/:id/buy', skill_controller.skill_buy_get)
router.post('/skill/:id/buy', skill_controller.skill_buy_post)
router.get('/skill/:id', skill_controller.skill_detail)
router.get('/skills', skill_controller.skill_list)

module.exports = router;
