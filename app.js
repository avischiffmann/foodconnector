var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
    res.render('index');
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


let docRef = db.collection('users').doc('qian');

let setAda = docRef.set({
  first: 'qian',
  last: 'zuo'
});