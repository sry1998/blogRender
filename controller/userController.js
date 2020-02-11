const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const config = require('../config');

exports.getRegister = function (req, res) {
  res.render('register');
}

exports.register = async function (req, res) {
  const createUser = new User(req.body);
  await createUser.save();
  const token = jwt.sign({ id: createUser.id, role: createUser.role, name: createUser.name }, config.secret);
  res.cookie('token',token, {httpOnly: true });
  res.redirect('/dash');
}

exports.getLogin = function (req, res) {
  res.render('login');
}

exports.login = async function(req, res) {
  User.findOne({ email: req.body.email, password: req.body.password }, { password: 0 },function (err, User) {
  if (err) return res.status(500).send('Error on the server.');
  if (!User) return res.status(404).send('No user found.');
  const token = jwt.sign({ id: User.id, role: User.role, name: User.name }, config.secret);
  res.cookie('token',token, {httpOnly: true });
  res.redirect('/dash');
  });
};


exports.logout = function(req, res) {
  res.clearCookie('token').redirect('/login');
}
