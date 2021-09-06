const { response } = require('express');

const Movie = require('../models/movie');
const Character = require('../models/character');



const postMovie = async (req, res = response) => {
    const movie = req.body;
    try {
        const new_movie = await Movie.create(movie);
        await Character.updateMany({ '_id': new_movie.characters }, { $push: { movies: new_movie._id } });
        return res.send(new_movie);
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

const getMovies = async (req, res = response) => {
    const query = req.query;
    const {order} = req.query || ASC;
    console.log(order)
    console.log(query)
    try {
        const movies = await Movie.find(query).select('image name creation_date')
            .populate('genre', 'name')
            .sort({ name: order});
        res.json({
            movies
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

const getMovie = async (req, res = response) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id)
            .populate('genre', 'name')
            .populate('characters', 'name')
        res.json({
            movie
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }

}

const putMovie = async (req, res = response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true });
        if (movie) {
            res.json({
                movie
            })
        }
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

const deleteMovie = async (req, res = response) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        await movie.remove();
        await Character.updateMany({ '_id': movie.characters }, { $pull: { movies: movie._id } });
        return res.json({
            movie_deleted: movie
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}



module.exports = {
    postMovie,
    getMovies,
    getMovie,
    putMovie,
    deleteMovie
}