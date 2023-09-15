const router = require('express').Router()
const ChamadosController = require('../Controllers/ChamadosController')
//helpers
const verifyToken = require('../helpers/verify-token')

//---------------- rotas privadas ----------------
router.post('/create', verifyToken, ChamadosController.create)
router.get('/getall', verifyToken, ChamadosController.getAll)
router.get('/mychamados', verifyToken, ChamadosController.getAllUserChamados)
router.patch('/editar/:id', verifyToken, ChamadosController.updateChamados)

module.exports = router