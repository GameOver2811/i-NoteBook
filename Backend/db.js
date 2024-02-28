const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook";



// Connecting to mongoDB 
const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
