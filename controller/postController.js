const postModel = require('../model/postModel');
const likeModel = require('../model/likeModel')

exports.getDashboard = function (req, res) {
  req.flash('info', 'Welcome');
  res.render('user/dashboard', { name: req.user.name });
}

exports.getAddPost = function (req, res) {
  res.render('post/addpost', { msg: req.flash('addPost') });
}

exports.addPost = async function (req, res) {
  const createPost = new postModel(req.body);
  createPost.userid = req.user.id;
  try {
    await createPost.save();
    req.flash('post/addPost', 'Post added successfully!');
    res.redirect('/post');
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getPost = async function (req, res) {
  let likecount = [];
  let obj = {};
  try {
    if (req.user.role === "Admin") {
      const posts = await postModel.find();
      const likes = await likeModel.find({});
      if (posts) {
        for (let i = 0; i < posts.length; i++) {
          const groupByLike = await likeModel.aggregate([
            {
              "$match":
              {
                postid: {
                  $eq: "" + posts[i]._id
                }
              }
            },
            {
              $group:
              {
                _id: posts[i]._id,
                count: { $sum: 1}
              }
            }
          ]);
          obj = {
            _id: posts[i]._id,
            count: 0
          }
          if(groupByLike.length){
            likecount.push(groupByLike);
          }
          else{
            likecount.push(obj);
          }
        }    
        likecount = likecount.flat();  
        res.render('post/getpost', 
        { 
          post: posts, 
          like: likes, 
          user: req.user.id,
          likeCount: likecount
        });
      }
      else {
        res.render('post/getpost', { error: "Nothing to show" });
      }
    }
    else {
      const posts = await postModel.find({ userid: req.user.id });
      const likes = await likeModel.find({});
      if (posts) {
        for (let i = 0; i < posts.length; i++) {
          const groupByLike = await likeModel.aggregate([
            {
              "$match":
              {
                postid: {
                  $eq: "" + posts[i]._id
                }
              }
            },
            {
              $group:
              {
                _id: posts[i]._id,
                count: { $sum: 1}
              }
            }
          ]);
          obj = {
            _id: posts[i]._id,
            count: 0
          }
          if(groupByLike.length){
            likecount.push(groupByLike);
          }
          else{
            likecount.push(obj);
          }
        }    
        likecount = likecount.flat();  
        res.render('post/getpost', 
        { 
          post: posts, 
          like: likes, 
          user: req.user.id,
          likeCount: likecount
        });
      }
      else {
        res.render('post/getpost', { error: "Nothing to show" });
      }
    }
  } catch (err) {
    res.render('post/getpost', { error: "Something went wrong" });
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