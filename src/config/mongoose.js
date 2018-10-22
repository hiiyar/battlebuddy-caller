const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/battlebuddy', {useNewUrlParser: true, user: "caller", pass: "123"})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

module.exports = mongoose;