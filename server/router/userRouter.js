import express from 'express'

const userRouter = express.Router();
const users = [
  {
    id: 101,
    name: "Amy",
    email: "AmoCreates@outlook.com",
    contact: 56858648,
    age: 20
  },
  {
    id: 102,
    name: "Harsh",
    email: "harsh785@gmail.com",
    contact: 7854585,
    age: 55
  },
  {
    id: 103,
    name: "Rishav",
    email: "puffcorn@gmail.com",
    contact: 85765664,
    age: 22
  },
  {
    id: 104,
    name: "Nitesh",
    email: "niteshmishra234@gmail.com",
    contact: 85458653,
    age: 22
  },
  {
    id: 105,
    name: "Jitin",
    email: "jitinsingh74@gmail.com",
    contact: 74727856,
    age: 22
  },
  {
    id: 106,
    name: "Sunny",
    email: "sunny582@gmail.com",
    contact: 56727856,
    age: 22
  },
]

userRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const user = users.find((u) => (u.id == id))
  if(user) {
    return res.status(200).json(user)
  }
  res.status(401).send(`user ${id} not found`)
})

export default userRouter;