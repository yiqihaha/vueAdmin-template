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

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  });
}



