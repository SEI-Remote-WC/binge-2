import * as tokenService from './tokenService';

export function search(type, query) {
  return fetch(`/api/media/search/${type}/${query}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}

export function searchOne(type, id) {
  return fetch(`/api/media/searchOne/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}

export function searchSimilar(type, id) {
  return fetch(`/api/media/searchSimilar/${type}/${id}`, {
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  }, {mode: "cors"})
  .then(res => res.json())
}


export function searchGenre(type, id) {
  return fetch(`/api/media/searchGenre/${type}/${id}`, {
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