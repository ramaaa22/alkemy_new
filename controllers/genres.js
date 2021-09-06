const {response} = require('express');

const Genre = require('../models/genre')

const getGenres = async(req,res=response)=>{
    try {
        const genres = await Genre.find();
        res.json({
            genres
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}


const postGenre = async (req,res=response)=>{
    const genre = req.body;
    try {
        const new_genre = new Genre(genre);
        await new_genre.save();
        res.json(new_genre);
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
   
}




const putGenre = async (req,res=response)=>{
    const {id} = req.params;
    const data = req.body;
    try {
        const genre = await Genre.findByIdAndUpdate(id,data,{new:true});
        res.json({
            genre
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
    
    

}


module.exports={
    getGenres,
    postGenre,
    putGenre,
}