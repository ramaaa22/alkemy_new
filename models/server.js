const express=require('express');
const cors =require('cors');
const users_routes = require('../routes/user')


class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.users_path='/api/users'
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del Body
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.users_path, users_routes)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendoen en puerto ${this.port}`)
          })
    }
}

module.exports=Server