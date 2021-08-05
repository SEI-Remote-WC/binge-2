
import { Tv } from "../models/tv.js"
import axios from "axios"

export {
  search,
  searchOne,
  searchSimilar,
  searchGenre
}

function searchGenre(req, res) {
  axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_Key}&with_genres=${req.params.id}`)
  .then(response => {
    console.log(response.data)
  })
}

function index(req, res) {
  Tv.find({}).then((tvs) => res.json(tvs))
}

function search(req, res) {
  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${req.params.query}`)
  .then(response => {
    res.json(response.data)
  })
}

function searchOne(req, res) {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}

function searchSimilar(req, res) {
  axios.get(`https://api.themoviedb.org/3/tv/${req.params.id}/similar?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}