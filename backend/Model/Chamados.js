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
        allowNull: true
    },
    fk_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    fk_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        }
    }
})
module.exports = Chamados