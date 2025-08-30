const express=require('express')
const functionsroute=require('./routes/functions')
const cors=require('cors')
const db=require('./config')


const app=express()
app.use('',functionsroute)
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT,()=>{
   console.log(`app running on http://localhost:${process.env.PORT}`)
})