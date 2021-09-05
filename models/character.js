const {Schema,model}= require('mongoose')

const CharacterSchema=Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    story:{
        type:String
    },
    movies:[
        {
            type:Schema.Types.ObjectId,
            ref:'Movie'
        }
    ]
})

module.exports=model('Character',CharacterSchema)