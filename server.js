const express = require('express')  // import express
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')    // import mongodb
const UserModel = require('./models/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbSession = require('connect-mongodb-session')(session);
const mongoDbUri = 'mongodb+srv://BrilliantMind:brilliantmind@cluster0.6i1mj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//const bodyParser = require("body-parser");
var bodyParser = require('body-parser')

const store = new mongoDbSession({
    uri: mongoDbUri,
    collection: 'Sessions'
})

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/html', express.static(__dirname + 'public/html'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/APIs', express.static(__dirname + 'public/APIs'));

//set views
app.set('views', './views');
app.set('view engine', 'ejs');

//middleware
//app.use(cookieParser());
//app.use(express.urlencoded({ extended: true }));

app.use(cors());
//app.use(express.json());
//app.use(express.json({extended: false,}));
//app.use(require('body-parser').json()); 
//app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('body-parser').express.json);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

app.use(session({
    secret: "BrilliantMind",
    resave: false, //no "double" sessions
    saveUninitialized: false, //cookie wollen wir manuell setzen 
    store: store
}))

//import routes
const authRoute = require('./routes/authentication');
app.use(authRoute);
const website = require('./routes/website');
app.use(website);
const settings = require('./routes/settings');
app.use(settings);


mongoose.connect(mongoDbUri, { useNewUrlParser: true }, { useUnifiedTopology: true } );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // Error for connection problems
db.once('open', function callback () {
    console.log('Connected To Mongo Database');
});

app.use(express.json);

app.listen(PORT, () => console.log(`Server listening... ${PORT}!`))