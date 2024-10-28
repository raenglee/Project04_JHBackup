import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loginCheck: false,
    username: '',
    nickname: ''
  }),
  getters: {},
  actions: {
    login(data) {
      this.loginCheck = true;
      this.nickname = data.nickname;
      this.username = data.username;
    },
    logout() {
      this.loginCheck = false;
      this.nickname = '';
      this.username = '';
    }
  },
  persist: true
});
