const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { nonExistingId } = require('../tests/test_helper')

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/api/blogs', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
  } catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter