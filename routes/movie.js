var express = require('express');
var router = express.Router();

// Models
const Movie = require('../Models/Movie')

/* GET movies  */
router.get('/', (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ]);
  promise
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

/* GET TOP 10 movies  */
router.get('/top-10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });
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
    .then((data) => res.json(data))
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

      res.json({ status: 200, remove: 1 })
    })
    .catch(err => res.json(err))
})

/* GET between dates movies  */
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;

  /** 
   * $gte --> büyük ve eşit
   * $lte --> küçük ve eşit
   * $gt  --> büyük
   * $lt  --> küçük  
   **/
  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
  });

  promise
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

module.exports = router;
