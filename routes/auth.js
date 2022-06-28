const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
//Register
router.post('/register',async(req,res)=>{
    try {
        const salt =await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(req.body.password,salt)
        
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        })
//save user into db
        const user=await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
})

// login

router.post('/login', async(req,res)=>{
    try {   
    const user=await User.findOne({email:req.body.email})
    // !user && res.status(404).json("user not found")

    const validPass=await bcrypt.compare(req.body.password,user.password)
    !validPass && res.status(400).json("Wrong credentials")

    res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router