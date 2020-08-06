import { post, get } from './axios'

export function login (data) {
  return post('/user/login', data)
}

export function getInfo (token) {
  return get('/user/info', { token })
}

export function logout () {
  return post('/user/logout')
}
