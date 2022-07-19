const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (err) {
                console.log(err);
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)

        }
    } else {
        return res.status(403).json("you can update only your account")
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne({ _id: req.params.id })
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)

        }
    } else {
        return res.status(403).json("you can delete only your account")
    }
})
//get user
router.get('/:id', async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findById( req.params.id )
            const {password,updatedAt,...other}=user._doc
            res.status(200).json(other)
        } catch (error) {
            return res.status(500).json(error)

        }
    }
})
//follow user


module.exports = router