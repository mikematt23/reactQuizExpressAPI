const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const db = require("../Data/database")


router.post("/addUser",async (req,res)=>{
   const email = req.body.email
   let password = req.body.password
   const score = req.body.score
   
   bcrypt.hash(password,3,async (err, hash)=>{
     let hashedPassword = hash
     if(err){
       return err
     }
     let query = `INSERT INTO users(email,password, score)
      VALUES("${email}","${hashedPassword}",${score})
     `
     await db.query(query)

     return res.json({message:"useradded"})
   })
})

router.post("/userLogin",async(req,res)=>{
   const email = req.body.email
   const password = req.body.password
  
   const query = `SELECT * FROM users WHERE email = "${email}"`
   const [user,userFeilds] = await db.query(query)
   console.log(user)
   
   bcrypt.compare(password,user[0].password,(err,result)=>{
    if(err){
        return err
    }
    if(result){
        return res.json({user:user[0]})
    }else{
        return res.json({message:"Wrong Password"})
    }
   })
})

module.exports = router