import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/authStorage';

const user = {
  state: {
    userId: 0,
    userName: '',
    avatar: '',
    auths: [],
    menu: [],
  },

  mutations: {
    SET_USER_ID: (state, userId) => {
        state.userId = userId;
    },
    SET_NAME: (state, userName) => {
      state.name = userName;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_AUTHS: (state, auths) => {
      state.auths = auths;
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
    },
  },

  actions: {

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data;
          commit('SET_AUTHS', data.auths);
          commit('SET_MENU', data.menu);
          commit('SET_USER_ID', data.userId);
          commit('SET_NAME', data.userName);
          commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_MENU', []);
          commit('SET_AUTHS', []);
          commit('SET_USER_ID', 0);
          commit('SET_NAME', '');
          commit('SET_AVATAR', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_MENU', []);
        commit('SET_AUTHS', []);
        commit('SET_USER_ID', 0);
        commit('SET_NAME', '');
        commit('SET_AVATAR', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
