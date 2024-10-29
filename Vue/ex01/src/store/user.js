import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loginCheck: false,
    username: '',
    nickname: ''
  }),
  actions: {
    login(data) {
      this.loginCheck = true;
      this.nickname = data.nickname;
      this.username = data.username;

      localStorage.setItem('nickname', data.nickname);
      localStorage.setItem('username', data.username);
    },

    logout() {
      this.loginCheck = false;
      this.nickname = '';
      this.username = '';

      localStorage.removeItem('nickname');
      localStorage.removeItem('username');
    }
  },
  persist: true
});
