const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/write',(req,res)=>{
    fs.writeFile('./files/hello.txt','this is a text file.',(err)=>{
        if(err) console.error(err)
        res.send('Done');
        
    })
})

app.get('/read',(req,res)=>{
    fs.readFile('./files/hello.txt','utf-8',(err,data)=>{
        if(err) console.error(err)
        res.send(data);
        
    })
})

app.get('/unlink',(req,res)=>{
    fs.unlink('./files/hello.txt',(err)=>{
        if(err) console.error(err)
        res.send('File Deleted...');
        
    })
})



app.listen(3000)