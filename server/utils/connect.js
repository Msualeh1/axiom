const mongoose = require("mongoose");





async function connectMongo() {
    try {
     
      await mongoose.connect('mongodb+srv://cbaloch40:S5O0XickIu11ZBpg@cluster0.2jzm1hd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true, // Corrected option name
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDb');
      staticCollection = mongoose.connection.collection('static');
      
    } catch (error) {
      console.log('error connecting to MongoDb', error);
    }
  }
 

  module.exports= connectMongo;