import fetch from '@/utils/fetch';

export function login(username, password, rememberMe) {
  return fetch({
    url: '/api/authenticate',
    method: 'post',
    data: {
        username,
        password,
        rememberMe
    }
  });
}

export function getInfo() {
  return fetch({
    url: '/api/userInfo/userInfo',
    method: 'post',
  });
}

export function getMenu() {
  return fetch({
    url: '/api/userInfo/getMenu',
    method: 'post',
  });
}

export function logout() {
  return fetch({
    url: '/api/userInfo/logout',
    method: 'post'
  });
}