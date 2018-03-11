const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .find({})
      .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    res.json(users.map(User.format))
  } catch (exception) {
    console.log(exception)
    return res.status(500).send({ error: 'something went wrong' })
  }
})

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    if (body.username.length < 3) {
      return res.status(400).json({ error: 'username must contain at least 3 characters' })
    }
    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'username must be unique' })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
      adult: body.adult === undefined ? true : body.adult
    })

    const savedUser = await user.save()

    res.json(User.format(savedUser))

  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter