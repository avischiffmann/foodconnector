var express = require('express');
var app = express();
const request = require('request');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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
    request(`https://api.tomtom.com/search/2/geocode/${req.body.address}.json?key=PULYzrAblFY0Hoyr6hyGMpYzTTu1tiGT`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let docRef = db.collection('Consumers').doc();
        let setAda = docRef.set({
            food: req.body.foods,
            quantity: req.body.quantity,
            notes: req.body.notes,
            typeOfUser: req.body.typeOfUser,
            date: formatDate(new Date()),
            address: req.body.address,
            lat: body.results[0].position.lat,
            lon: body.results[0].position.lon
        });
    });
});

app.post('/newDistribution', function (req, res) {
    console.log(req.body);

    request(`https://api.tomtom.com/search/2/geocode/${req.body.address}.json?key=PULYzrAblFY0Hoyr6hyGMpYzTTu1tiGT`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.results[0].position.lat);
        let docRef = db.collection('Distributors').doc();
        let setAda = docRef.set({
            food: req.body.foods,
            quantity: req.body.quantity,
            price: req.body.price,
            address: req.body.address,
            expiration: req.body.expiration,
            name: req.body.name,
            typeOfUser: req.body.typeOfUser,
            establishment: req.body.establishment,
            date: formatDate(new Date()),
            lat: body.results[0].position.lat,
            lon: body.results[0].position.lon,
        });
    });

});

app.get('/signup', async (req, res) => {
    res.render('signup');
});

app.post('/test', async (req, res) => {
    var user_name = req.body.say
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
var addresses = [];
var establishments = [];
var prices = [];
var foodQuantities = [];
var distributorFoods = [];
var expirations = [];

db.collection('Distributors').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data().lon);
            counter++;
            latitudes.push(doc.data().lat);
            longitudes.push(doc.data().lon);
            names.push(doc.data().name);
            addresses.push(doc.data().address);
            establishments.push(doc.data().establishment);
            prices.push(doc.data().price);
            foodQuantities.push(doc.data().quantity);
            distributorFoods.push(doc.data().food);
            expirations.push(doc.data().expirations);

            console.log(counter);
            console.log(distributorFoods);
            console.log(latitudes)
            console.log(longitudes)
        });
        app.get('/', async (req, res) => {
            res.render('index', { total: counter, latitudes: latitudes, longitudes, longitudes, names: names, addresses: addresses, establishments: establishments, prices, prices, foodQuantities: foodQuantities });
        });
        app.post('/consumer', function (req, res) {
            consumerCounter = 0;
            var foods = [];
            var quantities = [];
            var consumerNotes = [];
            var typesOfUser = [];
            var dates = [];
            var consumerLats = [];
            var consumerLons = [];

            db.collection('Consumers').get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        consumerCounter++;
                        console.log(doc.id, '=>', doc.data().food);
                        foods.push(doc.data().food);
                        quantities.push(doc.data().quantity);
                        consumerNotes.push(doc.data().notes);
                        typesOfUser.push(doc.data().typeOfUser);
                        dates.push(doc.data().date);
                        consumerLats.push(doc.data().lon);
                        consumerLons.push(doc.data().lat);

                    });
                    res.render('consumerMap', { total: counter, latitudes: latitudes, longitudes, longitudes, names: names, totalRequests: consumerCounter, foods: foods, quantities: quantities, consumerNotes: consumerNotes, typesOfUser: typesOfUser, dates: dates, addresses: addresses, establishments: establishments, prices, prices, foodQuantities: foodQuantities, distributorFoods: distributorFoods, expirations: expirations });

                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
        });
        app.post('/distributor', function (req, res) {
            console.log(counter)
            consumerCounter = 0;
            var consumerLats = [];
            var consumerLons = [];

            db.collection('Consumers').get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        consumerCounter++;        
                        consumerLats.push(doc.data().lon);
                        consumerLons.push(doc.data().lat);

                    });
                    res.render('distributorMap', { total: consumerCounter, latitudes: consumerLons, longitudes, consumerLats });

                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });