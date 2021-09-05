const {DataTypes} = require('sequelize')
const db = require('../database/connection')

const MovieSql= db.define('Movie',{
    name:{
        type:DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    },
    created:{
        type:DataTypes.TIME
    },
    points:{
        type:DataTypes.INTEGER
    },
    
},
{
    tableName:'movies',
    timestamps:false
})

MovieSql.associate = (models) => {
    MovieSql.belongsTo(models.GenreSql, {
        as: "genre",
        foreignKey: "genre_id",
    });
};



module.exports=MovieSql