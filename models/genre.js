const {Schema, model} = require('mongoose');

const GenreSchema =Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
})

module.exports = model('Genre',GenreSchema)