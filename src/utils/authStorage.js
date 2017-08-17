import tokenStore from 'store2';

const TokenKey = 'Admin-Token'

export function getToken() {
    return tokenStore.local(TokenKey)
}

export function setToken(token) {
  tokenStore.local(TokenKey, token)
}

export function removeToken() {
    return tokenStore.local(TokenKey, '')
}