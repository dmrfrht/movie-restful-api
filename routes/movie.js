var express = require('express');
var router = express.Router();

// Models
const Movie = require('../Models/Movie')

/* GET movie  */
router.get('/', (req, res) => {
  const promise = Movie.find({});
  promise
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

/* POST movie */
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body)
  const promise = movie.save()

  promise
    .then((data) => {
      res.json({ status: 200 })
    })
    .catch(err => res.json(err))
});

module.exports = router;
