'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multiPart = require('connect-multiparty');
var multiPartMiddleware = multiPart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/test/:id', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multiPartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;