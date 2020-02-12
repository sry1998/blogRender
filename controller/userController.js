const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../model/userModel');
const config = require('../config');

exports.getRegister = function (req, res) {
  res.render('register');
}

exports.register = async function (req, res) { 
  try{
    const createUser = new User(req.body);
    createUser.password = await bcrypt.hash(req.body.password, 10);
    await createUser.save();
    const token = jwt.sign({ id: createUser.id, role: createUser.role, name: createUser.name }, config.secret);
    res.cookie('token',token, {httpOnly: true });
    res.redirect('/dash');
  } 
  catch (err) { 
    res.status(500).send(err);
  }
}

exports.getLogin = function (req, res) {
  res.render('login', { errormsg: req.flash('errormsg') });
}

exports.login = async function(req, res) {
  try {
    await User.findOne({ email: req.body.email } ,function (err, User) {
      if (err) return res.status(500).send('Error on the server.');
      if (!User) return res.status(404).send('No user found.');
      const match = bcrypt.compareSync(req.body.password, User.password);
      if(match) {
        const token = jwt.sign({ id: User.id, role: User.role, name: User.name }, config.secret);
        res.cookie('token',token, {httpOnly: true });
        res.redirect('/dash');
      }
      else {
         req.flash("errormsg", "Invalid Email or Password");
         res.redirect('/login');
      }
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
  
};

exports.logout = function(req, res) {
  res.clearCookie('token').redirect('/login');
}
