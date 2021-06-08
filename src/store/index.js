import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import todo from './modules/todo';

import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

// localStorage 사용
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    // localStorage 저장하고 싶은 state만 저장
    todo: state.todo,
    username: state.username,
    token: state.token,
  }),
});

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  mutations: {
    // 2. state 변경
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
  },
  actions: {
    // 1. 비동기 작업하여 서버 처리 후
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data.token);
      commit('setToken', data.token);
      commit('setUsername', data.user.username);
      saveAuthToCookie(data.token);
      saveUserToCookie(data.user.username);
      return data;
    },
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  modules: {
    todo,
  },
  plugins: [vuexLocalStorage.plugin],
});
