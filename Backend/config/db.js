const mongoose = require("mongoose");
require("dotenv/config");

const connect = () => {
    mongoose.connect(
        process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log('connected to DB successfully');
    }).catch(err => {
        console.log('error occured while connecting to DB', err);
    });
}
module.exports = { connect };