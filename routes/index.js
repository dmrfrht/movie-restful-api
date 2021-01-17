const express = require('express');
const Users = require('../Models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      const user = new Users({
        username,
        password: hash
      })

      const promise = user.save();
      promise
        .then(data => res.json(data))
        .catch(err => res.json(err))
    })

});

module.exports = router;
