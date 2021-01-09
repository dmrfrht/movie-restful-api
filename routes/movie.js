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

/* GET only movie  */
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id)
  promise
    .then(movie => {
      if (!movie) next({ message: 'The movie was not found.', code: 404 })

      res.json(movie)
    })
    .catch(err => res.json(err))
})

/* POST movie */
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body)
  const promise = movie.save()

  promise
    .then((data) => {
      res.json(data)
    })
    .catch(err => res.json(err))
});

/* PUT only movie */
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true })
  promise
    .then(movie => {
      if (!movie) next({ message: 'The movie was not found.', code: 404 })

      res.json(movie)
    })
    .catch(err => res.json(err))
})

/* DELETE only movie */
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id)
  promise
    .then(movie => {
      if (!movie) next({ message: 'The movie was not found.', code: 404 })

      res.json({ status: 200, remove: true })
    })
    .catch(err => res.json(err))
})



module.exports = router;
