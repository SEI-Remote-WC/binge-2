import * as tokenService from '../services/tokenService';
const BASE_URL = '/api/tvs/';

export function search(query) {
  return fetch(`${BASE_URL}/search/${query}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}


export function searchOne(id) {
  return fetch(`${BASE_URL}/searchOne/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}


export function searchSimilar(id) {
  return fetch(`${BASE_URL}/searchSimilar/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}
