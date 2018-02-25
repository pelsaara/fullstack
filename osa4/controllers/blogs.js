const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .find({})
            .populate('user', { username: 1, name: 1 })

        res.json(blogs.map(Blog.format))
    } catch (exception) {
        console.log(exception)
        return res.status(500).send({ error: 'something went wrong' })
    }
})


blogsRouter.post('/', async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const body = req.body

        if (body.title === undefined || body.url === undefined) {
            return res.status(400).json({ error: 'content missing' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.json(Blog.format(savedBlog))
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            res.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            res.status(500).json({ error: 'something went wrong...' })
        }
    }

})

blogsRouter.delete('/:id', async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(req.params.id)

        if (blog === null) {
            return res.status(400).send({ error: 'malformatted id' })
        }
        if (blog.user) {
            if (blog.user.toString() !== decodedToken.id.toString()) {
                return res.status(403).json({ error: 'only the author is allowed to delete this blog' })
            }
        }

        await Blog.findByIdAndRemove(blog._id)
        res.status(204).end()
    } catch (exception) {
        console.log(exception)
        res.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    try {
        const body = req.body

        if (body === undefined) {
            return res.status(400).json({ error: 'content missing' })
        }

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog)
        return res.status(200).json(Blog.format(updatedBlog)).send()

    } catch (exception) {
        console.log(exception)
        return res.status(400).send({ error: 'something went wrong' })
    }
})

module.exports = blogsRouter