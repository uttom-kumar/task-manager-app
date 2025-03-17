import {DATABASE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE, WEB_JSON_SIZE } from './src/config/config.js'

// TODO : BASIC LIBRARY IMPORT
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

// TODO : MONGODB LIBRARY IMPORT
import mongoose from 'mongoose'
import router from './src/routes/api.js'
import cookieParser from 'cookie-parser'


/* ---- ---- */
// ✅ SECURITY MIDDLEWARE IMPLEMENTATION
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// 🛑 Prevent NoSQL Injection Attack
app.use(mongoSanitize())

// 🛑 Prevent XSS Attack
app.use(helmet())

// ✅ CORS Policy Set
app.use(cors({
  origin: 'https://task-manager-app-dusky-six.vercel.app',
  credentials: true
}));

// 🛑 Block Suspicious IP (Dynamic)
const blockedIPs = [];

app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (blockedIPs.includes(clientIP)) {
    return res.status(403).json({ message: 'Your IP is Blocked 🚫' });
  }

  next();
});

// 🛑 Prevent HTTP Parameter Pollution Attack
app.use(hpp())

// ✅ Cookie Parser
app.use(cookieParser())

// 🛑 Rate Limiting
app.use(express.json({ limit: WEB_JSON_SIZE }))
app.use(express.urlencoded({ limit: WEB_JSON_SIZE, extended: URL_ENCODE }))

const limiter = rateLimit({
  windowMs: REQUEST_TIME, // 15 minutes
  max: REQUEST_NUMBER,   // Max 100 requests per IP
  message: "Too many requests from this IP, try again later."
});
app.use(limiter)

// ✅ Cache Control
app.set('etag', WEB_CACHE)

// ✅ File Upload Security
app.use(fileUpload({
  useTempFiles: false,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
  abortOnLimit: true,
  safeFileNames: true
}))

/* ------ ------ */
// ✅ MONGODB CONNECTION
let URL = DATABASE
let OPTION = {
  user: '',
  pass: '',
  autoIndex: true,
}

mongoose.connect(URL, OPTION).then(() => {
  console.log('✅ Connected to MongoDB')
}).catch((e) => {
  console.log('❌ Connection Error:', e)
})

/* ------ ------ */
// ✅ API ROUTE CONFIGURATION
app.use('/api', router)

export default app;
