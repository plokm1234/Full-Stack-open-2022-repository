const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const blog = require('../models/blog')


beforeEach(async () => {
  await blog.deleteMany({})

  helper.initialBlogs.forEach(async (b) => {
    let blogObject = new blog(b)
    await blogObject.save()
  })
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there is one blog', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('the first blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]).toContain(
        {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        }
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain({"author": "Robert C. Martin"})
})

afterAll(() => {
  mongoose.connection.close()
})