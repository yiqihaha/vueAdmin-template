import { asyncRouterMap, constantRouterMap } from '@/router/index';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(auths, route) {
  if (route.id) {
    return auths.indexOf(route.id) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, auths) {
  console.log(auths)
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
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
          const { auths } = data
          let accessedRouters
          accessedRouters = filterAsyncRouter(asyncRouterMap, auths)
          commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};



export default permission;
