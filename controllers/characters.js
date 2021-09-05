const {response} = require('express')

const Character = require('../models/character')
const Movie = require('../models/movie');

const getCharacters= async (req, res=response)=> {
    const query = req.query
    console.log(query)
    const characters = await Character.find(query).select('name image')
    res.json({
        characters
    })
}

const getCharacterById = async(req,res=response)=>{
    const {id} = req.params;

    const character = await Character.findById(id).populate('movies','name');
    if (character){
        res.json({
            character
        })
    }
    return res.status(400).json({
        msg:'No existe el personaje solicitado'
    })
}



const postCharacter= async (req,res=response)=>{

    const  character  = req.body;

    const new_character = await Character.create(character);

    await Movie.updateMany({ '_id': new_character.movies }, { $push: { characters: new_character._id } });

    return res.send(new_character);
    
}

const deleteCharacter= (req, res=response)=>{
    res.json({
        msg:'Este es del DELEte'
    })
}

const patchCharacter= (req, res=response)=>{
    res.json({
        msg:'Este es del PATCH'
    })
}

const updateCharacter = async (req,res=response)=>{
    const {id} = req.params;
    const data = req.body;
    console.log(data)
    const character = await Character.findByIdAndUpdate(id,data,{new:true});
    if (character){
        res.json({
            character
        })
    }
    else{
        res.json({
            msg:'No existe'
        })
    }
    
}

module.exports = {
    getCharacters,
    getCharacterById,
    postCharacter,
    deleteCharacter,
    patchCharacter,
    updateCharacter
}