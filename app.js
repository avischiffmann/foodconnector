var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.get('/post', async (req, res) => {
    res.render('post');
});

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

app.post('/newRequest', function (req, res) {
    console.log(req.body);
    let docRef = db.collection('Consumers').doc();
let setAda = docRef.set({
  food: req.body.foods,
  quantity: req.body.quantity,
  notes: req.body.notes,
  typeOfUser: req.body.typeOfUser,
  date: formatDate(new Date())
});
});

app.get('/signup', async (req, res) => {
    res.render('signup');
});

app.post('/test', async (req,res) => {
    var user_name=req.body.say
    console.log(user_name);
    res.end();
  });

app.listen(process.env.PORT || 3000);
console.log("Listening on port: " + 3000);

var admin = require("firebase-admin");

var serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foodconnector-c2f13.firebaseio.com"
});

let db = admin.firestore();

var counter = 0;
var latitudes = [];
var longitudes = [];
var names = [];

db.collection('Distributors').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data().longitude);
      counter++;
      latitudes.push(doc.data().latitude);
      longitudes.push(doc.data().longitude);
      names.push(doc.data().name);
      console.log(latitudes);
      console.log(longitudes);
      console.log(names);
    });
    app.get('/', async (req, res) => {
        res.render('index', { total: counter, latitudes: latitudes, longitudes, longitudes, names: names });
    });
    app.post('/consumer', function (req, res) {
        res.render('consumerMap', { total: counter, latitudes: latitudes, longitudes, longitudes, names: names });
    });
    app.post('/distributor', function (req, res) {
        res.render('distributorMap', { total: counter, latitudes: latitudes, longitudes, longitudes, names: names });
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });