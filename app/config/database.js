const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI')

const connectDB = async () => {
  try{
    console.log("goat")
    await mongoose.connect( database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Database connected ...')

  }catch(err){
    console.error(err.message);
    //exit process with failure
    process.exit(1);

  }
}

module.exports = connectDB;