const Character = require('../models/character'); 
const Genre = require('../models/genre');
const GenreSql = require('../models/genre_sql');
const MovieSql = require('../models/movie_sql')


const existsCharacterWithName =  async (name='')=>{
    const exists = await Character.findOne({name});
    if (exists) {
        throw new Error('El personaje ya existe en la BD')
    }
}

/*const existsGenreWithName =  async (name='')=>{
    const exists = await Genre.findOne({name});
    if (exists) {
        throw new Error('El género ya existe en la BD')
    }
}*/

const existsGenreWithName =  async (name='')=>{
    const exists = await GenreSql.findOne({
        where:{
            name:name
        }
    })
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
    const exists = await MovieSql.findOne({
        where:{
            name
        }
    })
    if (exists) {
        throw new Error('La pelicula ya existe en la BD')
    }
}

module.exports={
    existsCharacterWithName,
    existsCharacterWithId,
    existsGenreWithName,
    existsMovieWithName
}