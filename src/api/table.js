import fetch from '@/utils/fetch';

export function getList(params) {
  return fetch({
    url: '/api/example/simple/table',
    method: 'post',
    params
  });
}

export function fetchList(query) {
    return fetch({
        url: '/api/example/complicated/table',
        method: 'post',
        params: query
    });
}


