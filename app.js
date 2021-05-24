const port = process.env.PORT || 8080;
const expressFunction = require('express');
var app = expressFunction();

const mongoose = require('mongoose');
const dbPath = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myNewDb";

mongoose.connect(dbPath);

app.use(expressFunction.json());
app.use('/api/users',require('./routes/userRouts.js'));
app.use('/auth',require('./routes/loginRoutes.js'));
app.listen(port);











