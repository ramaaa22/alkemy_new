const express=require('express');
const cors =require('cors');
const character_routes = require('../routes/character');
const genre_routes = require('../routes/genre');
const movie_routes = require('../routes/movie');
const { dbConnection } = require('../database/config');
const db = require('../database/connection');


class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.character_path='/api/characters';
        this.genre_path='/api/genres'
        this.movie_path='/api/movies'
        //Conexion con bd
        //this.connectDb();
        this.connectDbSql();
        //Uso de middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async connectDb(){
        await dbConnection();
    }

    async connectDbSql(){
        try {
            await db.authenticate();
            console.log('Database Sql Online')
        } catch (error) {
            console.log('Ha ocurrido un error');
            throw new Error(error);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del Body
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.character_path, character_routes);
        this.app.use(this.genre_path,genre_routes);
        this.app.use(this.movie_path,movie_routes);
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendoen en puerto ${this.port}`)
          })
    }
}

module.exports=Server