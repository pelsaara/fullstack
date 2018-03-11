const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const func = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(func, 0)
}

const favouriteBlog = (blogs) => {
    const func = (fav, blog) => {
        return (fav.likes > blog.likes) ? fav : blog
    }
    const favourite = blogs.reduce(func, 0)

    return blogs.length === 0 ? undefined : {
        title: favourite.title,
        author: favourite.author,
        likes: favourite.likes
      }
}

const mostBlogs = (blogs) => {

    const authors = []

    blogs.forEach(blog => {
        if (authors.find(author => author.name === blog.author)) {
            aIndex = authors.findIndex(author => author.name === blog.author)
            authors[aIndex].blogs = authors[aIndex].blogs + 1
        } else {
            let author = {name: blog.author, blogsWritten: 1}
            authors.concat(author)
        }
    })

    let most = {name: '', blogsWritten: 0}
    authors.forEach(author => {
        if (author.blogs > most.blogsWritten) {
            most = author
        }
    })
    return most
}

const mostLikes = (blogs) => {

    const authors = []

    blogs.forEach(blog => {
        if (authors.find(author => author.name === blog.author)) {
            aIndex = authors.findIndex(author => author.name === blog.author)
            authors[aIndex].totalLikes = authors[aIndex].totalLikes + blog.likes
        } else {
            let author = {name: blog.author, totalLikes: blog.likes}
            authors.concat(author)
        }
    })
    
    let most = {name: '', totalLikes: 0}

    authors.forEach(author => {
        if (author.totalLikes > most.totalLikes) {
            most = author
        }
    })

    return most
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}