import {DATABASE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE, WEB_JSON_SIZE } from './src/config/config.js'


// TODO : BASIC LIBRATY IMPORT
import express, { Router } from 'express'
import bodyParser from 'body-parser'
const app = express()
// TODO : SECURITY MIDDLEWARE LIBRARY IMPORT
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import cors from 'cors'
import hpp from 'hpp'
import fileUpload from 'express-fileupload'
// TODO : MONGODB LIBRATY IMPORT
import mongoose from 'mongoose'
import router from './src/routes/api.js'
import cookieParser from 'cookie-parser'
/* ---- ---- */
// TODO : SECURITY MIDDLEWARE LIBRATY IMPLEMENT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize())
app.use(helmet())

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));


app.use(hpp())
app.use(cookieParser())
// TODO : RATE LIMITER CONFIGURATION IMPLEMENT
app.use(express.json({limit : WEB_JSON_SIZE}))
app.use(express.urlencoded({limit : WEB_JSON_SIZE, extended : URL_ENCODE}))
const limiter  = rateLimit( {windowMs : REQUEST_TIME, max : REQUEST_NUMBER})
app.use(limiter)
// TODO :CACHE CONFIGURATION
app.set('etag' , WEB_CACHE)


app.use(fileUpload({
  useTempFiles: false
}))

/* ------ ------ */
// TODO : MONGODB/MONGOOSE CONFIGURATION
let URL = DATABASE
let OPTION = {
  user: '', pass: '',
  autoIndex : true,
}
mongoose.connect(URL, OPTION).then(()=> {
    try{
        console.log('Connected to MongoDB')
    }
    catch(e){
        console.log('Connection Error : ', e)
    }
})



// TODO : ROUTING CONFIGURATION
app.use('/api', router)
export default app;