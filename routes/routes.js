const express = require('express');
const middleware = require('../middleware/token')
const userController = require('../controller/userController');
const postController = require('../controller/postController');
const router = express.Router();

router.get('/register', userController.getRegister);

router.post('/register',  userController.register);

router.get('/login', userController.getLogin);

router.post('/login', userController.login);

router.get('/:id/dash', middleware.verifyToken,  postController.getDashboard);

router.get('/:id/post', middleware.verifyToken, postController.getAddPost);

router.post('/:id/post',  middleware.verifyToken, postController.addPost);

router.get('/:id/posts', middleware.verifyToken, postController.getPost);

router.post('/:id/posts/:id/like', middleware.verifyToken, postController.getLikes);

router.get('/:id/logout', userController.logout);

module.exports =  router;     