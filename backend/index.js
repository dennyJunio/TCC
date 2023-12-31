const express = require('express')
const cors = require('cors')

const app = express()

const conn = require('./db/conn')

app.use(express.json())

app.use(cors({ credentials: true, origin: '*' }))

app.use(express.static('public'))

//Rotas
const UserRoutes = require('./routes/UserRoutes')
const ChamadosRoutes = require('./routes/ChamadosRoutes')
app.use('/users', UserRoutes)
app.use('/chamados', ChamadosRoutes)

conn
    .sync()
    .then(() => {
        app.listen(8080)    
    })
    .catch((error) => console.log(error))
