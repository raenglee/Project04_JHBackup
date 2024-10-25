import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const loginCheck = ref(!!token.value);

  // 로그인 시 토큰을 저장하고 상태를 업데이트
  const login = (newToken) => {
    token.value = newToken;
    loginCheck.value = true;
    localStorage.setItem('token', newToken);
  };

  // 로그아웃 시 토큰을 삭제하고 상태를 업데이트
  const logout = () => {
    token.value = null;
    loginCheck.value = false;
    localStorage.removeItem('token');
  };

  return {
    token,
    loginCheck,
    login,
    logout
  };
});
