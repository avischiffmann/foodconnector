var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT || 3000);
console.log("Listening on port: " + 3000);