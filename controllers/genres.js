const {response} = require('express');

const Genre = require('../models/genre')
const GenreSql = require('../models/genre_sql')

const getGenre = async(req,res=response)=>{
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
    const {name,image} = req.body;
    const data={
        name,
        image
    }
    console.log(data)
    const new_genre = new Genre(data);
    await new_genre.save();
    res.json(new_genre);
}

const getGenreSql = async(req,res=response)=>{
    try {
        const genres = await GenreSql.findAll({
            attributes:['name']
        });
        return res.json({
            genres
        })
    } catch (error) {
        res.status(400).json({
            error
        })
        
    }
}

const postGenreSql = async(req,res=response)=>{
    const data = req.body;
    try {
        /*const exists = await GenreSql.findOne({
            where:{
                name:data.name
            }

        })*/
        //if (!exists){
            const genre = await new GenreSql(data);
            await genre.save();
            res.json(genre)
        //}
        /*else{
            res.status(400).json({
                msg:'El género ya existe en la BD'
            })
        }*/
        
    } catch (error) {
        res.status(400).json({
            msg:'La operacion no ha sido completada'
        })
        
    }
}



const putGenre = async (req,res=response)=>{
    const {id} = req.params;
    const data = req.body;
    const genre = await Genre.findByIdAndUpdate(id,data,{new:true});
    if (genre){
        res.json({
            genre
        })
    }
    else{
        res.json({
            msg:'No existe'
        })
    }

}


module.exports={
    getGenre,
    postGenre,
    postGenreSql,
    getGenreSql,
    putGenre,
}