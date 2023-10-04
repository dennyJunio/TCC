const router = require('express').Router()
const { verify } = require('jsonwebtoken')
const UserController = require('../Controllers/UserController')
//helpers
const verifyToken = require('../helpers/verify-token')
// const imageUpload = require('../helpers/image-upload')

//rota para criar "registrar" um usuario
//---------------- rotas publicas ----------------
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/myusers', verifyToken, UserController.getAll)
router.get('/:id', UserController.getUserById)

//---------------- rotas privadas----------------  
//só acessar caso esteja logado!!!
router.patch('/edit/:id',  verifyToken, /*imageUpload.single('image'),*/ UserController.editUser)
router.delete('/:id', verifyToken, UserController.removeUser)

module.exports = router