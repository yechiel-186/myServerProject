const port = process.env.PORT || 8080;
const expressFunction = require('express');
var app = expressFunction();
const cors =require('cors');

const mongoose = require('mongoose');
const dataController = require('./controllers/dataController.js');

const dbPath = process.env.MONGO_URI || "mongodb+srv://Yechiel:server@cluster0.y30tw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbPath);

app.use(cors());
app.use(expressFunction.json());

app.use('/admin',require('./routes/adminRouts.js'));
app.use('/login',require('./routes/loginRouts.js'));
app.use('/api',dataController);
app.use('/api/supervisor',require('./routes/supervisorRouts.js'))
app.use('/api/users',require('./routes/userRouts.js'));
app.use('/register',require('./routes/registerRoutes.js'));

app.listen(port);