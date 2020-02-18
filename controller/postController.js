const postModel = require('../model/postModel');
const likeModel = require('../model/likeModel')

exports.getDashboard = function (req, res) {
  req.flash('info', 'Welcome');
  res.render('dashboard', { name: req.user.name });
}

exports.getAddPost = function (req, res) {
  res.render('addpost', { msg: req.flash('addPost') });
}

exports.addPost = async function (req, res) {
  const createPost = new postModel(req.body);
  createPost.userid = req.user.id;
  try {
    await createPost.save();
    req.flash('addPost', 'Post added successfully!');
    res.redirect('/post');
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getPost = async function (req, res) {
  try {
    if (req.role === "Admin") {
      const posts = await postModel.find();
      const likes = await likeModel.find({});
      if (posts) {
        res.render('getpost', { post: posts, like: likes, user: req.user.id });
      }
      else {
        res.render('getpost', { error: "Nothing to show" });
      }
    }
    else {
      const posts = await postModel.find({ userid: req.user.id });
      const likes = await likeModel.find({});
      if (posts) {
        res.render('getpost', { post: posts, like: likes, user: req.user.id });
      }
      else {
        res.render('getpost', { error: "Nothing to show" });
      }
    }
  } catch (err) {
    res.render('getpost', { error: "Something went wrong" });
  }
}

exports.getLikes = async function (req, res) {
  const createLike = new likeModel(req.body);
  createLike.userid = req.user.id;
  try {
    if (req.body.btnValue == 'Like') {
      await createLike.save();
      res.json(createLike);
    }
    else {
      await likeModel.deleteOne({ postid: req.body.postid, userid: req.user.id });
      const obj = {
        postid: req.body.postid,
        userid: req.user.id,
        status: 'deleted'
      }
      res.json(obj);
    }
  }
  catch (err) {
    res.send(err);
  }
}