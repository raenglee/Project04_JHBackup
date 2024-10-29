import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loginCheck: false,
    username: '',
    nickname: '',
    email: ''
  }),
  actions: {
    login(data) {
      this.loginCheck = true;
      this.nickname = data.result.nickname;
      this.username = data.result.username;
      this.email = data.result.email;

      // localStorage.setItem('nickname', data.result.nickname);
      // localStorage.setItem('username', data.result.username);
    },

    logout() {
      this.loginCheck = false;
      this.nickname = '';
      this.username = '';
      this.email = '';

      // localStorage.removeItem('nickname');
      // localStorage.removeItem('username');
      // localStorage.removeItem('email');
    }
  },
  persist: true
});
