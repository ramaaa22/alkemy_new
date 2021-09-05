const {response} = require('express');

const Movie = require('../models/movie');
const Character = require('../models/character');
const MovieSql = require('../models/movie_sql');


const postMovie = async (req, res=response)=>{
    const  movie  = req.body;

    const new_movie = await Movie.create(movie);

    await Character.updateMany({ '_id': new_movie.characters }, { $push: { movies: new_movie._id } });

    return res.send(new_movie);
}

const getMovies = async (req,res=response)=>{
    const movies = await Movie.find({}).select('image name creation_date')
    res.json({
        movies
    })
}

const getMovie = async (req,res=response)=>{
    const {id} = req.params;
    const movie = await Movie.findById(id)
        .populate('genre', 'name')
        .populate('characters','name')
    if (!movie){
        res.status(400).json({
            msg:'No existe la pelicula'
        })
    }
    res.json({
        movie
    })
}

const getMoviesSql = async (req,res=response)=>{
    try {
        const movies = await MovieSql.findAll({
            attributes:['name','image','created','genre_id'],
            /*include:[
                {
                    association:'genre'
                }
            ]*/
        })
        return res.json({
            movies
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

const getMovieSql = async(req,res=response)=>{
    const {id} = req.params;
    console.log(id)
    try {
        const movie = await MovieSql.findByPk(id);
        console.log(movie)
        res.json({
            movie
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

const postMovieSql = async (req,res=response)=>{
    const data = req.body;
    try {
        const movie =await new MovieSql(data);
        await movie.save();
        res.json(movie)
    } catch (error) {
        res.status(400).json({
            msg:'No se ha podido agregar a la BD'
        })
    }
}

module.exports={
    postMovie,
    getMovies,
    getMovie,
    postMovieSql,
    getMoviesSql,
    getMovieSql
}