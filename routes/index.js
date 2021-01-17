var express = require('express');
const Users = require('../Models/Users');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  const user = new Users({
    username,
    password
  })

  const promise = user.save();
  promise
    .then(data => res.json(data))
    .catch(err => res.json(err))
});

module.exports = router;
