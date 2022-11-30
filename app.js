const express = require('express');
const path = require('path');
const app = express();
var mongoose = require('mongoose');
//const bodyparser = require("body-parser");



// var mongoose = require('mongoose');

// var mongoURI = "mongodb://localhost:27017/contact";
// var MongoDB = mongoose.connect(mongoURI).connection;
// MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//   console.log("mongodb connection open");
// });


 mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: 'true' } , function(err){
    if (err) throw err;
 });
 const port = 80;
//Define Mongoose Schema
 var contactSchema = new mongoose.Schema({       
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded());

// Pug Specific stuff
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory


//Endpoints
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug',params);
})



app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to database")

    }).catch(() => {
        res.status(400).send("This item has not been saved to database")
    });

})



//Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${80}`)
})
