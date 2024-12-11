const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/usersRoutes")

let port = process.env.PORT || 3000


app.use(cors({
  origin:"http://localhost:5173/"
}))
app.use(express.json())

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'))
  })
app.use(userRoutes)


app.listen(port)
console.log("app listening on port " )