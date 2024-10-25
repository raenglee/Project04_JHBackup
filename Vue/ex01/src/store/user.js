import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loginCheck: false,
    email: ''
  }),
  actions: {
    login() {
      //login 성공 -> backend 통신
      this.loginCheck = true;
    },
    logout() {
      this.loginCheck = false;
      this.email = '';
    }
  }
});
