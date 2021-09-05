/*const { DataTypes, Sequelize } = require('sequelize')
const db = require('../database/connection')

const GenreSql = db.define('Genre', {
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
},
    {
        tableName: 'genres',
        timestamps: false
    })

GenreSql.associate = (models) => {
    GenreSql.hasMany(models.MovieSql, {
        as: "movies",
        foreignKey: "genre_id",
    });
};


module.exports = GenreSql*/

module.exports = (sequelize, DataTypes) => {
    const GenreSql = sequelize.define(
        "Genre",
        {
            name: {
                type: DataTypes.STRING
            },
            image: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'genres',
            timestamps: false
        }
    );
    GenreSql.associate = (models) => {
        GenreSql.hasMany(models.MovieSql, {
            as: "movies",
            foreignKey: "genre_id",
        });
    };

    return GenreSql;
}