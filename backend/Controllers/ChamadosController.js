const User = require('../Model/User')
const Chamados = require('../Model/Chamados')
const jwt = require('jsonwebtoken')

//helpers
const getToken = require('../helpers/get-token')
const getUserById = require('../helpers/get-user-by-token')
const getUserByToken = require('../Helpers/get-user-by-token')

module.exports = class ChamadosController {
    static async create(req, res) {
        const { titulo, tipo, descricao, status } = req.body

        //validações
        if (!titulo) {
            res.status(422).json({ message: 'O titulo é obrigatório' })
            return
        }
        if (!tipo) {
            res.status(422).json({ message: 'O tipo é obrigatório' })
            return
        }
        if (!status) {
            res.status(422).json({ message: 'O status é obrigatório' })
            return
        }

        //pegando o dono do chamados
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        //criando chamados
        const chamados = new Chamados({
            titulo: titulo,
            descricao: descricao,
            tipo: tipo,
            status: status,
            fk_user: currentUser.id
        });

        try {
            // Save the pet to the database
            const newChamados = await chamados.save();

            res.status(201).json({ message: 'O chamado foi feito com sucesso', newChamados });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getAll(res) {
        const chamados = await Chamados.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ chamados: chamados });
    }

    //filtrando os chamados por usuario
    static async getAllUserChamados(req, res) {
        //encontrando o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        const chamados = await Chamados.findAll({
            where: { userId: currentUserId },
            order: [['createdAt', 'DESC']],
        })

        res.status(200).json({ chamados })
    }

    static async removeChamdosById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }

        const chamados = await Chamados.findByPk(id)

        //validando se o ID é valido
        if (!chamados) {
            res.status(422).json({ message: 'Chamado não existe' })
            return
        }

        //checar se o usuario logado registrou o chamdo
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        // if (Number(pet.userId) !== Number(currentUserId)) {
        //     res.status(422).json({ message: 'ID inválido' })
        //     return
        // }

        await Chamados.destroy({ where: { id: id } })

        res.status(200).json({ message: 'Chamado removido com sucesso' })
    }

    static async updateChamados(req, res) {
        const id = req.params.id
        const { titulo, descricao, tipo, status } = req.body

        const updateData = {}
        const chamados = await Chamados.findByPk(id);

        if (!chamados) {
            res.status(404).json({ message: "Chamado não existe!" });
            return;
        }

        //filtra o dono do chamado aberto
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (chamados.UserId !== currentUser.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        if (!titulo) {
            res.status(422).json({ message: "O titulo é obrigatório!" });
            return;
        } else {
            updateData.titulo = titulo
        }
        if (!descricao) {
            updateData.descricao = " "
        } else {
            updateData.descricao = descricao
        }
        if (!tipo) {
            res.status(422).json({ message: "O tipo é obrigatório!" });
            return;
        } else {
            updateData.tipo = tipo
        }
        if (!status) {
            res.status(422).json({ message: "A status é obrigatória!" });
            return;
        } else {
            updateData.status = status
        }

        await Chamados.update(updateData, { where: { id: id } });

        res.status(200).json({ message: "Chamado atualizado com successo!" })
    }
}