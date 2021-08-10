import { Profile } from "../models/profile.js"
import { Media } from '../models/media.js'

export {
  index,
  userProfile,
  friend,
  unfriend,
  getRecent
}

function getRecent(req, res) {
  Profile.find({})
  .sort({createdAt: -1})
  .limit(5)
  .populate({
    path: 'friends',
    populate: {
      path: 'media'
    }
  })
  .populate('media')
  .then(recentProfiles => {
    Media.find({ type: 'tv' })
    .sort({ _id: -1 })
    .limit(5)
    .populate('collected_by')
    .then(recentTv => {
      Media.find({ type: 'movie' })
      .sort({ _id: -1 })
      .limit(5)
      .populate('collected_by')
      .then(recentMovies => {
        const recentActivity = {recentProfiles, recentTv, recentMovies}
        res.json(recentActivity)
      })
    })
  })
}

function userProfile(req, res) {
  Profile.findById(req.user.profile)
  .populate('media')
  .populate('friends')
  .then(profile => {
    res.json(profile)
  })
}

function friend(req, res) {
  Profile.findById(req.user.profile)
  .populate('media')
  .populate('friends')
  .then(profile=> {
    profile.friends.push(req.params.id)
    profile.save()
    .then(()=> res.json(profile))
  })
}

function unfriend(req, res) {
  Profile.findById(req.user.profile)
  .populate('media')
  .populate('friends')
  .then(profile => {
    profile.friends.remove({_id: req.params.id})
    profile.save()
    .then(()=> res.json(profile))
  })
}

function index(req, res) {
  Profile.find({})
  .populate('media')
  .populate('friends')
  .then((users) => {
    res.json(users)
  })
}