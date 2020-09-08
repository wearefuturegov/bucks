const express = require("express")
const mongoose = require("mongoose")
const apiRouter = require("./routes/api")
const sslRedirect = require("heroku-ssl-redirect")
const basicAuth = require("express-basic-auth")
const Sentry = require("@sentry/node")
const cors = require("cors")
const services = require("./controllers/services")

require("dotenv").config()

Sentry.init({ dsn: process.env.SENTRY_DSN })

const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, (err)=>{
    // eslint-disable-next-line no-console
    if(err) return console.error(err)
    // eslint-disable-next-line no-console
    console.log("> DB connection opened 🎉")
})

const server = express()

server.use(Sentry.Handlers.requestHandler())

server.set("trust proxy", 1)


server.use(express.json({ limit: '50mb', extended: true }))
server.use(express.urlencoded({ limit: '50mb', extended: true, }));


server.use(require("forest-express-mongoose").init({
    modelsDir: __dirname + "/models",
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    mongoose: mongoose,
}))

if(process.env.USER && process.env.PASSWORD) {
    server.use(basicAuth({
        users: { [process.env.USER]: [process.env.PASSWORD] }
    }))
}

server.use(sslRedirect())
server.use(cors())




// API routes
server.use("/api", apiRouter)

// Forest routes
server.post('/forest/service/actions/import-services', services.importFromCsv)

server.use(Sentry.Handlers.errorHandler())

server.listen(port, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`> Ready on port ${port} 🎁`)
})
