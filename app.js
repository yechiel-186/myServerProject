const port = process.env.PORT || 8080;
const expressFunction = require('express');
var app = expressFunction();
const cors =require('cors');

const mongoose = require('mongoose');
const dataController = require('./controllers/dataController.js');

const dbPath = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myNewDb";

mongoose.connect(dbPath);

app.use(cors());
app.use(expressFunction.json());

app.use('/login',require('./routes/loginRouts.js'));
app.use('/api',dataController);
app.use('/api/users',require('./routes/userRouts.js'));
app.use('/auth',require('./routes/registerRoutes.js'));

app.listen(port);