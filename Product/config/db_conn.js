const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
  .catch(err => console.log(err));

module.exports = mongoose;