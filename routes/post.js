const router = require('express').Router()
const Post = require('../models/Post')
// create a post

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const setPost = await newPost.save()
        res.status(200).json(setPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a post

router.put('/:id', async (req, res) => {
    const post =await Post.findById(req.params.id)
    try {
        if (post.userId === req.body.userId) {

            const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json(updatePost)
        }
        else {
            res.status(401).json({ message: "You can update only your own post" })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// delete a post

router.delete('/:id', async (req, res) => {
    try {
        const post =await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
                await post.deleteOne()
                res.status(200).json({ message: "Post deleted successfully" })
        }
        else {
            console.log(await post.userId);
            console.log(req.body.userId);
            res.status(401).json({ message: "You can delete only your own post" })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// like a post
// get a post
// get timeline posts

module.exports = router