const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const config = require('../config');

exports.register = async function (req, res) {
  const createUser = new User(req.body);
  await createUser.save(function (err, User) {
    res.status(200).send({ status: true, token: createUser });
  });
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
  const msg = {
    msg: "Cookie created",
    data: req.cookies.token
  }
  //res.send(msg);
  res.redirect('/dash');
  });
};
