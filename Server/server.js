const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');

const frontendUrl = (process.env.FRONTEND_URL || '').replace(/\/+$/, '');

app.set('trust proxy', 1) // needed when app is behind a proxy like Render Cloudflare
app.use(cors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const cookieParser = require('cookie-parser');
const connectToDb = require('./Config/db')
const authRoutes = require('./Routes/authRoutes')
const documentRoutes = require('./Routes/documentRoutes')


app.use(express.json())
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api', documentRoutes)

const port = process.env.PORT || 8000
const db = process.env.DB_URI

app.get('/', (req,res)=>{
    res.send('This is Home Route')
})

app.listen(port, (req,res)=>{
    console.log(`Server is running at http://localhost:${port}`)
    connectToDb(db)
})