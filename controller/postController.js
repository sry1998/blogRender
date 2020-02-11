const postModel = require('../model/postModel');

exports.addPost = async function (req, res) {
  const createPost = new postModel(req.body);
  createPost.userid = req.user.id;
  try {
    await createPost.save();
    const msg = "Post added succesfully"
    res.render('addpost', { msg: msg });
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getPost = async function (req, res) {
  try {
    if (req.role === "Admin") {
      const posts = await postModel.find();
      res.send(posts);
    }
    else {
      const posts = await postModel.find({ userid: req.user.id }, { userid: 0, _id: 0});
      res.render('getpost',{post:posts});
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getDashboard = function (req, res) {
  res.render('dashboard', { name: req.user.name });
}

exports.getAddPost = function (req, res) {
  res.render('addpost', { msg: "" });
}


