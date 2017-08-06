import {asyncRouterMap, constantRouterMap} from '@/router/index';

function hasPermission(auths, route) {
  if (route.id) {
    return auths.indexOf(route.id) >= 0
  } else {
    return true
  }
}

function filterAsyncRouter(asyncRouterMap, auths) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(auths, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, auths)
      }
      return true
    }
    return false

  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {auths} = data;
        console.log(auths);
        let accessedRouters;
        accessedRouters = filterAsyncRouter(asyncRouterMap, auths);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;
