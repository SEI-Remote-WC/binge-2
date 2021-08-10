import axios from "axios"
import { Profile } from '../models/profile.js'
import { Media } from '../models/media.js'

export {
  search,
  searchOne,
  searchSimilar,
  searchGenre,
  addMedia,
  removeMedia,
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

function searchGenre(req, res) {
  axios.get(`https://api.themoviedb.org/3/discover/${req.params.type}?api_key=${process.env.API_KEY}&with_genres=${req.params.id}`)
  .then(response => {
    res.json(response.data)
  })
}


function search(req, res) {
  axios.get(`https://api.themoviedb.org/3/search/${req.params.type}?api_key=${process.env.API_KEY}&query=${req.params.query}`)
  .then(response => {
    res.json(response.data)
  })
}

function searchOne(req, res) {
  axios.get(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}

function searchSimilar(req, res) {
  axios.get(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/similar?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}

