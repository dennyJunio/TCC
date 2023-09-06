//Categoria.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Categoria = db.define('Categoria', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
module.exports = Categoria