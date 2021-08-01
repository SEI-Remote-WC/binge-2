
import { User } from "../models/user.js"

export {
  index,
}

function index(req, res) {
  User.find({}).then((users) => res.json(users))
}