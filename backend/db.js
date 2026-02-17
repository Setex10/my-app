
require('dotenv').config()
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI

async function runDB() {
  try {
    await mongoose.connect(uri, {
        dbName: "devProject"
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error){
    console.log("hdhdhshd")
  }
}

mongoose.connection.on('connected', () => {
    console.log('🚀 Mongoose conectado a MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('⚠️ Error de Mongoose durante la ejecución:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose se ha desconectado');
});

module.exports = runDB