//Chamados.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('./User')
const Categoria = require('./Categoria')
const Chamados = db.define('Chamados', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fk_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    }
})
module.exports = Chamados