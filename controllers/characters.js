const { response } = require('express')

const Character = require('../models/character')
const Movie = require('../models/movie');

const getCharacters = async (req, res = response) => {
    const query = req.query
    try {
        const characters = await Character.find(query).select('name image');
        res.json({
            characters
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }

}

const getCharacterById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const character = await Character.findById(id).populate('movies', 'name');
        res.json({
            character
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No existe el personaje solicitado'
        })
    }


}



const postCharacter = async (req, res = response) => {
    const character = req.body;
    try {
        const new_character = await Character.create(character);
        await Movie.updateMany({ '_id': new_character.movies }, { $push: { characters: new_character._id } });
        return res.send(new_character);
    } catch (error) {
        return res.status(400).json({
            error
        })
    }


}

const deleteCharacter = async (req, res = response) => {
    console.log('ingreso aca')
    const {id} = req.params;
    try {
        const character = await Character.findById(id);
        console.log(character)
        await character.remove();
        await Movie.updateMany({ '_id': character.movies }, { $pull: { characters: character._id } });
        //return res.redirect(character);
        return res.json({
            character_deleted:character
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

const patchCharacter = (req, res = response) => {
    res.json({
        msg: 'Este es del PATCH'
    })
}

const updateCharacter = async (req, res = response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const character = await Character.findByIdAndUpdate(id, data, { new: true });
        if (character) {
            res.json({
                character
            })
        }
    } catch (error) {
        res.status(400).json({
            error
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