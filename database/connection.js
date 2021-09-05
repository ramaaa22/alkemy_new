const {Sequelize} = require('sequelize');

const db = new Sequelize('alkemy','admin','admin',{
    host:'localhost',
    dialect:'mysql',
    //logging:false
});

module.exports=db;