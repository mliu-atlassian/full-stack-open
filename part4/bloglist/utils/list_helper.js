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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
