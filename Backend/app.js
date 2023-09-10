const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require('./config/db');
const toDoRoutes = require('./routes/toDoRoutes');
db.connect();
const cors = require('cors');
app.use(cors());
app.use('/toDo', toDoRoutes);
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Header", "*");

//     next();
// });

app.listen(process.env.PORT, () => {
        console.log('server started succcessfully at port: ', process.env.PORT);
    })
    // process.env.DB_URI