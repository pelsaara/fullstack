const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('when there is initially some saved blogs', async () => {
    beforeAll(async () => {
        await Blog.remove({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        await Promise.all(blogObjects.map(blog => blog.save()))
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)
        const returnedContents = response.body.map(blog => blog.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedContents).toContain(blog.title)
        })
    })
})

describe('a new blog is added', async () => {
    test('valid blog can be added', async () => {
        const blogsAtStart = await blogsInDb()

        const newBlog = {
            title: "Test Title",
            author: "Test Author",
            url: "http://test.test",
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

        const contents = blogsAfterOperation.map(r => r.title)
        expect(contents).toContain(newBlog.title)
    })

    test('blog w/o likes added with 0 likes', async () => {
        const blogsAtStart = await blogsInDb()

        const newBlog = {
            title: "Testing",
            author: "T. Est",
            url: "http://test"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
        expect(blogsAfterOperation[blogsAfterOperation.length - 1].likes).toBe(0)

        const contents = blogsAfterOperation.map(r => r.title)
        expect(contents).toContain(newBlog.title)
    })

    test('blog w/o title or url cannot be added', async () => {
        const blogsAtStart = await blogsInDb()

        const newBlog = {
            author: "Not Allowed"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)

        const contents = blogsAfterOperation.map(r => r.title)
        expect(contents).not.toContain(newBlog.title)

    })
})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: 'Delete test',
            author: 'T. esting',
            url: 'http://t.t',
            likes: 3
        })
        await addedBlog.save()
    })

    test('deletion of a blog with valid id works', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)
            
        const blogsAfterOperation = await blogsInDb()
        const contents = blogsAfterOperation.map(r => r.title)
        expect(contents).not.toContain(addedBlog.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length-1)
    })
})


afterAll(() => {
    server.close()
})