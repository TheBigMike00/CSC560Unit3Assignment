//used the following website as a helpful resource
//https://zellwk.com/blog/crud-express-mongodb/ 

const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

// Connect URL
const url = 'mongodb://localhost:27017/';

// Connect to MongoDB
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('myFootballDB');
    console.log(`MongoDB Connected: ${url}`);







    //GET: all players
   app.get('/getplayers', function (req, res){
      db.collection('PlayerStats').find().toArray()
         .then(results => {
            console.log(results);
            res.end(JSON.stringify(results));
         })
         .catch(error => console.error(error))
   })








   //POST: create a new player record

   //premade JSON player to save time vs writing json in postman
   var player = {
      "amari" : {
         "name" : "Amari Rodgers",
         "touchdowns" : 0,
         "passYards" : 0,
         "rushYards" : 31,
         "recYards" : 274,
         "fgMade": 0
      }
   }
   
   app.post('/addplayer', function (req, res) {
      db.collection('PlayerStats').insertOne(player["amari"])
         .then(results => {
            console.log(results);
            res.end(JSON.stringify(results));
         })
         .catch(error => console.error(error))
   })






   //DELETE: delete a particular player (preset as same player in post)
   var nameOfPlayerToDelete = "Amari Rodgers";

   app.delete('/deleteplayer', function (req, res) {
      db.collection('PlayerStats').deleteOne({"name": nameOfPlayerToDelete})
         .then(result => {
            if(result.deletedCount === 0){
               return res.end("No record was deleted");
            }
            console.log(nameOfPlayerToDelete + " was successfully deleted");
            res.end(nameOfPlayerToDelete + " was successfully deleted");
         })
         .catch(error => console.error(error))
   })







   //UPDATE: update an existing player (Aaron Rodgers throws another touchdown!)
   var updatedARod = {
      "aaron" : {
         "name" : "Aaron Rodgers",
         "touchdowns" : 36,
         "passYards" : 4025,
         "rushYards" : 205,
         "recYards" : 0,
         "fgMade": 0
      }
   }

   app.put('/updateplayer', function (req, res) {
      db.collection('PlayerStats').findOneAndUpdate({"name": "Aaron Rodgers"}, {$inc:{touchdowns:1}})
         .then(result => {
            console.log("Record successfully updated");
            res.end("Record successfully updated");
         })
         .catch(error => console.error(error))
   })









   //GET player with most field goals made
   app.get('/getplayermostfgm', function (req, res){
      db.collection('PlayerStats').find().sort({"fgMade":-1}).limit(1).toArray()
         .then(result => {
            console.log(result);
            res.end(JSON.stringify(result));
         })
         .catch(error => console.error(error))
   })







   //GET player with most receiving yards
   app.get('/getplayermostrecyards', function (req, res){
      db.collection('PlayerStats').find().sort({"recYards":-1}).limit(1).toArray()
         .then(result => {
            console.log(result);
            res.end(JSON.stringify(result));
         })
         .catch(error => console.error(error))
   })






   //GET player with most touchdowns
   app.get('/getplayermosttouchdowns', function (req, res){
      db.collection('PlayerStats').find().sort({"touchdowns":-1}).limit(1).toArray()
         .then(result => {
            console.log(result);
            res.end(JSON.stringify(result));
         })
         .catch(error => console.error(error))
   })




   


   //GET all players by most pass yards descending
   app.get('/getplayerspassyardsdescending', function (req, res){
      db.collection('PlayerStats').find().sort({"passYards":-1}).toArray()
         .then(results => {
            console.log(results);
            res.end(JSON.stringify(results));
         })
         .catch(error => console.error(error))
   })







   //GET all players by rush yards descending
   app.get('/getplayersrushyardsdescending', function (req, res){
      db.collection('PlayerStats').find().sort({"rushYards":-1}).toArray()
         .then(results => {
            console.log(results);
            res.end(JSON.stringify(results));
         })
         .catch(error => console.error(error))
   })
});



 var server = app.listen(8081, function (){
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listenting at http://%s:%s", host, port)
})