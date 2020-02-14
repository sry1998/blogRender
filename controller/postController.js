const postModel = require('../model/postModel');

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
      if(posts) {
        res.render('getpost',{post: posts});
      }
      else {
        res.render('getpost',{error: "Nothing to show"});
      }
    }
    else {
      const posts = await postModel.find({ userid: req.user.id }, { _id: 0, userid: 0});
      if(posts) {
        res.render('getpost',{post: posts});
      }
      else {
        res.render('getpost',{error: "Nothing to show"});
      }
      
    }
  } catch (err) {
    res.render('getpost',{error: "Something went wrong"});
  }
}