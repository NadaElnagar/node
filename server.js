const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
 const serverUrl = 'mongodb+srv://testuser:RvjvjJiSDaRMn51M@cluster0.hmmhe.mongodb.net/mango?retryWrites=true&w=majority'
const app = express();
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
});
var User = mongoose.model("User", nameSchema);



MongoClient.connect(serverUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

     })

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get("/getuser", function (req, res) {
    User.find().then(documents => {
        res.json({status:200,message:'Users data fetched                   successfully',Userdata: documents});
    });
});

app.post("/quotes", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
