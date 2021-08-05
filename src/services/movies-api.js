import * as tokenService from '../services/tokenService';
const BASE_URL = '/api/movies/';

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


export function searchGenre(id) {
  return fetch(`${BASE_URL}/searchGenre/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}






// export function create(movie) {
//     return fetch(BASE_URL, {
//           method: "POST",
//           headers: {
//               'content-type': 'application/json', 
//               'Authorization': `Bearer ${tokenService.getToken()}`
//           },
//           body: JSON.stringify(movie)
//     }, {mode: "cors"})
//     .then(res => res.json());
//   }


//   export function update(movie) {
//   return fetch(`${BASE_URL}${movie._id}`, {
// 		method: "PUT",
// 		headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
// 		body: JSON.stringify(movie)
//   }, {mode: "cors"})
//   .then(res => res.json());
// }

// export function getAll() {
//     return fetch(BASE_URL, {mode: "cors"})
//     .then(res => res.json())
// }

// export function deleteOne(id) {
//     return fetch(`${BASE_URL}${id}`, {
//           method: 'DELETE',
//           headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
//     }, {mode: "cors"})
//     .then(res => res.json());
//   }