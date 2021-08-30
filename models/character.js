const {Schema,model}= require('mongoose')

const CharacterSchema=Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    age:{
        type:Integer,
        required:true
    },
    height:{
        type:Double,
        required:true
    },
    story:{
        type:String
    }
})

module.exports=model('Character',CharacterSchema)