const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb+srv://rootUser:135792468@cluster0.zidcw.mongodb.net/movie-app?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

  mongoose.connection.on('open', () => {
    // console.log('mongodb connected')
  })

  mongoose.connection.on('error', (err) => {
    console.log('mongodb: error', err)
  })

  mongoose.Promise = global.Promise
}
