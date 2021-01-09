var express = require('express');
var router = express.Router();

// Models
const Movie = require('../Models/Movie')

/* GET movie listing. */
router.post('/', function (req, res, next) {
  const movie = new Movie(req.body)
  const promise = movie.save()

  promise
    .then((data) => {
      res.json({ status: 200 })
    })
    .catch(err => res.json(err))
});

module.exports = router;
