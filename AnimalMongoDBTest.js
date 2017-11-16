var mongoose = require('mongoose')
var configuration = require('./config')
const connectString = configuration.mongodb.development.connectionString

var opts = {
    useMongoClient: true,
    appname: "AnimalMongoDBTest",
    poolSize: 10,
    autoIndex: false,
    bufferMaxEntries: 0,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500,
    autoReconnect: true,
    loggerLevel: "error", //error / warn / info / debug
    keepAlive: 120,
    validateOptions: true
}

mongoose.connect(connectString, opts, function(err){
   if (err) throw err;
   console.log("==> Conexión establecida con MongoDB");
})


// Strict schema
// var animal = mongoose.Schema({
//   name: {type: String, index: true},
//   color: {type: String, default: "Blanco"},
//   edad: {type: Number, default: 0},
//   apodos: [{type: String, default: []}],
//   propiedades: {
//     alto: Number,
//     largo: Number,
//     peso: Number
//   }
// },{ strict: false })
// var Animal = mongoose.model('animals', animal);

// No Strict schema
var animal = new mongoose.Schema({}, { strict: false });
var animal = mongoose.model('animals', animal);

// var animal = new Animal({ realName: "Super Man" });



var id = new mongoose.mongo.ObjectId('59fe1cf6d24aab7d9de521a7');

animal.update({nombre:"Gato"},{ "$push": { "followingRef": [id] } })
  .then(res => {
    console.log(res);
    console.log("OK");
  })
  .catch(err => {
    console.log("Error General", err);
  })

// animal.save()
