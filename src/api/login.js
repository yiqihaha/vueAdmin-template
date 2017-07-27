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
    url: '/api/userInfo',
    method: 'post',
  });
}

export function logout() {
  return fetch({
    url: '/api/logout',
    method: 'post'
  });
}



