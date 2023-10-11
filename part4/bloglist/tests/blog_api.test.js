const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    expect(titles).toContain('TDD harms architecture')
  })

  test('the unique identifier property is name `id`', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(
      blog => expect(blog.id).toBeDefined()
    )
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Mike',
      author: 'Mike Liu',
      url: 'liumike.dev',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Mike')
  })

  test('if likes property is missing it will default to zero', async () => {
    const newBlog = {
      title: 'Mike',
      author: 'Mike Liu',
      url: 'liumike.dev',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const savedBlog = blogsAtEnd.find(b => b.title === newBlog.title)
    expect(savedBlog.likes).toBe(0)
  })

  test('fails if title is missing', async () => {
    const newBlog = {
      author: 'Mike Liu',
      url: 'liumike.dev',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails if url is missing', async () => {
    const newBlog = {
      title: 'Mike',
      author: 'Mike Liu',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)

  })

  test('fails if id is invalid', async () => {
    await api
      .delete('/api/blogs/123')
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
