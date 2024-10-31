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
    },

    logout() {
      this.loginCheck = false;
      this.nickname = '';
      this.username = '';
      this.email = '';
    }
  },
  persist: true
});
