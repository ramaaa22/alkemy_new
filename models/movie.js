const {Schema,model} = require('mongoose');

const MovieSchema = Schema({
    name:{
        type:String,
        required:true,
    },
    creation_date:{
        type:String
    },
    calification:{
        type:Number
    },
    image:{
        type:String,
    },
    genre:{
        type:Schema.Types.ObjectId,
        ref:'Genre',
        required:true
    },
    characters:[
        {
            type:Schema.Types.ObjectId,
            ref:"Character"
        }
    ]
    
})


module.exports=model('Movie',MovieSchema);