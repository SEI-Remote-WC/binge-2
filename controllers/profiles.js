import { Profile } from "../models/profile.js"
import { Media } from '../models/media.js'

export {
  index,
  userProfile,
  friend,
  unfriend,
  addMedia,
  removeMedia
}

async function addMedia (req, res) {
  req.body.collected_by = req.user.profile
  const profile = await Profile.findById(req.user.profile)
  Media.findOne({api_id: req.body.api_id})
  .then(media =>  {
    if (media) {
      media.collected_by.push(req.user.profile)
      media.save()
      .then(media => {
        profile.media.push(media._id)
        profile.save()
        profile.populate('media').execPopulate()
        .then((profile) => {
          res.json(profile)
        })
      })
    } else {
      Media.create(req.body)
      .then(media => {
        profile.media.push(media._id)
        profile.save()
        profile.populate('media').execPopulate()
        .then((profile) => {
          res.json(profile)
        })
      })
    }
  })
}

async function removeMedia(req, res) {
  Media.findOne({ api_id: req.body.api_id })
  .then(media => {
    media.collected_by.remove({ _id: req.user.profile })
    media.save()
    .then(async () => {
      const profile = await Profile.findById(req.user.profile)
      let mediaIdx = profile.media.findIndex(media => media.id === req.body.api_id)
      profile.media.splice(mediaIdx, 1)
      profile.save()
      profile.populate('media').execPopulate()
      .then(()=> res.json(profile))
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