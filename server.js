const express = require('express')
const morgan = require('morgan')
const cors =require('cors')
const mongoose = require('mongoose');
const multer = require('multer')
const path =require('path')

mongoose.connect('mongodb://localhost:27017/mini-project', {useNewUrlParser: true, useUnifiedTopology: true})
const db =mongoose.connection
db.on('error',(err)=>{
    console.log(err);
})
db.once('open',()=>{
    console.log('Database connect..!');
})

const app=express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('productImage'))

app.use('/api/users',require('./routers/userRouter'))
app.use('/api/addproduct',require('./routers/addProductRouter'))
app.use('/api',require('./routers/addProductRouter'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.use((err,req,res,next)=>{
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('There was a multer error..?')
        }else{
            res.status(500).send({message:err.message})    
        }
    }else{
        res.status(200).send('File upload success..!')
    }
})

app.get('/',(req,res)=>{
    res.send('hello Bangladesh')
})

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`);
})