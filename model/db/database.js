
const mongoose = require('mongoose');


DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`MongoDB successfully connected to ${db.name}`);
    
});

module.exports = mongoose


