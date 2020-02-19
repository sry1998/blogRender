const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const config = require('../config');

exports.getRegister = function (req, res) {
  res.render('user/register', { name: req.User });
}

exports.register = async function (req, res) { 
  try{
    const createUser = new User(req.body);
    createUser.role = "User"
    await createUser.save();
    const token = jwt.sign({ id: createUser._id, role: createUser.role, name: createUser.name }, config.secret);
    res.cookie('token',token, {httpOnly: true });
    res.redirect(`/users/${createUser._id}/dash`);
  } 
  catch (err) { 
    res.status(500).send(err);
  }
}

exports.getLogin = function (req, res) {
  res.render('user/login', { errormsg: req.flash('errormsg'), name: req.User });
}

exports.login = async function(req, res) {
  try {
    await User.findOne({ email: req.body.email, password: req.body.password } ,function (err, User) {
      if (err) return res.status(500).send('Error on the server.');
      if(req.body.email == User.email && req.body.password == User.password) {
          const token = jwt.sign({ id: User._id, role: User.role, name: User.name }, config.secret);
          res.cookie('token',token, {httpOnly: true });
          res.redirect(`/users/${User._id}/dash`);
      }
      else {
        req.flash("errormsg", "Invalid Email or Password");
        res.redirect(`/users/login`);
      }
    });
  }
  catch (err) {
    res.status(500).send(err);
  } 
};

exports.logout = function(req, res) {
  res.clearCookie('token').redirect('/users/login');
}
