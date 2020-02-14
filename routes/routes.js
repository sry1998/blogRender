const express = require('express');
const middleware = require('../middleware/token')
const userController = require('../controller/userController');
const postController = require('../controller/postController');
const router = express.Router();

router.get('/register', userController.getRegister);

router.post('/register',  userController.register);

router.get('/login', userController.getLogin);

router.post('/login', userController.login);

router.get('/dash', middleware.verifyToken,  postController.getDashboard);

router.get('/post', middleware.verifyToken, postController.getAddPost);

router.post('/post',  middleware.verifyToken, postController.addPost);

router.get('/posts', middleware.verifyToken, postController.getPost);

router.post('/like', middleware.verifyToken, postController.getLikes);

router.get('/logout', userController.logout);

module.exports =  router;     