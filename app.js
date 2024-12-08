const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

let port = process.env.PORT
app.use(express.json())
app.use(cors())

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'))
  })


app.listen(port || 3000)
console.log("app listening on port " + 3000)