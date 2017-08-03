const getters = {
  sidebar: state => state.app.sidebar,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  userName: state => state.user.userName,
  auths: state => state.user.auths,
  menu: state => state.user.menu,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
