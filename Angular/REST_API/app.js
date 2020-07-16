const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());

// import Routes -- //

const userPostsRoute = require('./routes/userRoute');
const quePostRoutes = require('./routes/quePostRoutes');

// middle wares --//

app.use(cors());
app.use('/images', express.static('images'));
app.use('/user', userPostsRoute);
app.use('/questions', quePostRoutes);

// connect to DB //

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true }, 
    () => {
    console.log("connected to db");
});


// app-port -listening -- //

app.listen(3030);