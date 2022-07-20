const router = require('express').Router()
const post=require('../models/Post')
// create a post

router.post('/', async (req, res) => {
    const newPost=new Post(req.body)
    try {
        const setPost=await newPost.save()
        res.status(200).json(setPost)
    } catch (error) {
        res.status(500).json(error)
    }
}
)

// update a post
// delete a post
// like a post
// get a post
// get timeline posts

module.exports = router