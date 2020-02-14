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
      if (posts) {
        res.render('getpost', { post: posts, user:req.user.id });
      }
      else {
        res.render('getpost', { error: "Nothing to show" });
      }
    }
    else {
      const posts = await postModel.find({ userid: req.user.id });
      const likes = await likeModel.find();
      if (posts) {
        let btnval = req.flash('btnvalue') 
        btnlike = 'Like';
        res.render('getpost', { post: posts, like: likes, user:req.user});
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
  try {
    if (req.body.like == 'Like') {
      await likeModel.updateOne({ postid: req.body.id, userid: req.user.id },
        { $set: { like: true } },
        { upsert: true });
      res.redirect('/posts');
    }
    else {
      await likeModel.updateOne({ postid: req.body.id, userid: req.user.id },
        { $set: { like: false } });
      res.redirect('/posts');
    }
  }
  catch (err) {
    res.render('getpost', { error: "Something went wrong" });
  }
}