const Character = require('../models/character'); 
const Genre = require('../models/genre');
const Movie = require('../models/movie');
const User = require('../models/user');




const existsCharacterWithName =  async (name='')=>{
    const exists = await Character.findOne({name});
    if (exists) {
        throw new Error('El personaje ya existe en la BD')
    }
}

const existsGenreWithName =  async (name='')=>{
    const exists = await Genre.findOne({name});
    if (exists) {
        throw new Error('El género ya existe en la BD')
    }
}



const existsCharacterWithId =  async (id)=>{
    const exists = await Character.findById(id);
    if (!exists) {
        throw new Error('El personaje no existe en la BD')
    }
}

const existsMovieWithName =  async (name='')=>{
    const exists = await Movie.findOne({name})
    if (exists) {
        throw new Error('La pelicula ya existe en la BD')
    }
}

const existsUserWithMail =  async (mail='')=>{
    const exists = await User.findOne({mail})
    if (exists) {
        throw new Error('El usuario ya existe en la BD')
    }
}

module.exports={
    existsCharacterWithName,
    existsCharacterWithId,
    existsGenreWithName,
    existsMovieWithName,
    existsUserWithMail
}