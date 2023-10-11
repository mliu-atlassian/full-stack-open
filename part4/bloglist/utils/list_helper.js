const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (likes, blog) => {
    return likes + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = blogs => {
  const reducer = (prev, curr) => {
    return curr.likes > prev.likes ? curr : prev
  }
  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)
}

const mostBlogs = blogs => {
  const counts = _.countBy(blogs, 'author')
  const author = _.maxBy(Object.keys(counts), author => counts[author])
  return blogs.length === 0
    ? null
    : { author: author, blogs: counts[author] }
}

const mostLikes = blogs => {
  return blogs.length === 0
    ? null
    : _(blogs)
      .groupBy('author')
      .map((blogsByAuthor, author) => ({ author: author, likes: _(blogsByAuthor).sumBy('likes') }))
      .maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
