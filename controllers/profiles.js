
import { Profile } from "../models/profile.js"

export {
  index,
  userProfile,
  friend,
  unfriend
}

function userProfile(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    res.json(profile)
  })
}

function friend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile=> {
    profile.friends.push(req.params.id)
    profile.save()
    .then(()=> res.json(profile))
  })
}

function unfriend(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(()=> res.json(profile))
  })
}

function index(req, res) {
  Profile.find({})
  .then((users) => {
    res.json(users)
  })
}