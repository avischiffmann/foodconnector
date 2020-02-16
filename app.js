var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/signup', async (req, res) => {
    res.render('signup');
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


let docRef = db.collection('Distributors').doc();

// let setAda = docRef.set({
//   latitude: 30,
//   longitude: 120,
//   name: "Panda Express",
//   type: "Service"
// });

var counter = 0;
db.collection('Distributors').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data().name);
      counter++;
      console.log(counter)
    });
    app.get('/', async (req, res) => {
        res.render('index', { total: counter});
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  