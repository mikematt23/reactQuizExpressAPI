const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const db = require("../Data/database")


router.post("/addUser",async (req,res)=>{
   const email = req.body.email
   let password = req.body.password

   
   bcrypt.hash(password,3,async (err, hash)=>{
     let hashedPassword = hash
     if(err){
       return err
     }
     let query = `INSERT INTO users(email,password, score)
      VALUES("${email}","${hashedPassword}",${0})
     `
     await db.query(query)

     const query2 = `SELECT * FROM users WHERE email = "${email}"`
     const [user,userFeilds] = await db.query(query2)

     return res.json({message:"user added", user: {email:user[0].email, score:user[0].score}})
   })
})

router.post("/userLogin",async(req,res)=>{
   const email = req.body.email
   const password = req.body.password

   const query = `SELECT * FROM users WHERE email = "${email}"`
   const [user,userFeilds] = await db.query(query)

   if(user === undefined){
    return res.json({message:"No User"})
   }

   bcrypt.compare(password,user[0].password,(err,result)=>{
    if(err){
        return err
    }
    if(result){
        return res.json({user: {email:user[0].email, score:user[0].score}})
    }else{
        return res.json({message:"Wrong Password"})
    }
   })
})

router.put("/updateUserScore",async (req,res)=>{
  const email = req.body.email
  const score = req.body.score

  const query = `
    UPDATE users 
    SET score = ${score} 
    WHERE email = "${email}"
  `
  await db.query(query)
  return res.json({message: "Score updated"})
})

module.exports = router

