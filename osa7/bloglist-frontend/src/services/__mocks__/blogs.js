
let token = null

const blogs = [
  {
    id: "5a92f59c8572af3d5a9ffaad",
    title: "React patterns 5",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      _id: "5a92d9176204c41eb6dfb704",
      username: "kayttaja2",
      name: "Kayttaja 2"
    }
  },
  {
    id: "5a92f6ca2f6ee13e86f3a34b",
    title: "Test",
    author: "T",
    url: "https://test.com/",
    likes: 1,
    user: {
      _id: "5a92dd42b4fff823f4c9ae88",
      username: "kay",
      name: "Kayttaja 2"
    }
  },
  {
    id: "5a92f703aba3de3efe8be372",
    title: "Testing",
    author: "T",
    url: "https://test.com/",
    likes: 1,
    user: {
      _id: "5a92dd42b4fff823f4c9ae88",
      username: "kay",
      name: "Kayttaja 2"
    }
  },
  {
    id: "5a92f86dfd34ef405d87b429",
    title: "Testing jälleen",
    author: "T",
    url: "https://test.com/",
    likes: 1,
    user: {
      _id: "5a92d8e56204c41eb6dfb703",
      username: "kayttaja",
      name: "Kayttaja"
    }
  },
  {
    id: "5a9303e3f73dd149a1a88585",
    title: "Token testissä",
    author: "Token",
    url: "https://test.com/",
    likes: 2,
    user: {
      _id: "5a92d8e56204c41eb6dfb703",
      username: "kayttaja",
      name: "Kayttaja"
    }
  }

]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {
  token = token
}

export default { blogs, getAll, setToken }