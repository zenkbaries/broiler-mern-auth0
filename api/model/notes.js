const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema(
    {
        title:String,
        body: String
    },
    {
            timestamps: true
    }
);

module.exports = mongoose.model('Notes', Note);
