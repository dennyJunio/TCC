const router = require('express').Router()
const ChamadosController = require('../Controllers/ChamadosController')
//helpers
const verifyToken = require('../helpers/verify-token')

//---------------- rotas privadas ----------------
router.post('/create', verifyToken, ChamadosController.create)

module.exports = router