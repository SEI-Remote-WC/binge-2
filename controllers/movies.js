
import { Movie } from "../models/movie.js"
import axios from "axios"

export {
  search,
  searchOne,
  searchSimilar,
  searchGenre
}

function searchGenre(req, res) {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_Key}&with_genres=${req.params.id}`)
  .then(response => {
    console.log(response.data)
  })
}


function search(req, res) {
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.params.query}`)
  .then(response => {
    res.json(response.data)
  })
}

function searchOne(req, res) {
  axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}

function searchSimilar(req, res) {
  axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/similar?api_key=${process.env.API_KEY}&append_to_response=videos`)
  .then(response => {
    res.json(response.data)
  })
}

