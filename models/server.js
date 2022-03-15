const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/connection.js')


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            login: '/api/login',
            user: '/api/user',
            favourites: '/api/favourites'
        }



        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    middlewares() {

        this.app.use( express.static('public') )

        this.app.use( express.json() )

        this.app.use( cors() )
    }

    async conectarDB(){
        await dbConnection()
    }

    listen() {
        this.app.listen( this.port, () => { console.log(`Servidor corriendo en el puerto ${this.port}`) } )
    }

    routes() {

        this.app.use( this.paths.login, require('../routes/login') )
        this.app.use( this.paths.user, require('../routes/users') )
        this.app.use( this.paths.favourites, require('../routes/favourites') )
        
    }
}

module.exports = Server