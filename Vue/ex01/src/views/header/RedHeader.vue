<template>
  <!--🔴헤더-->
  <header>
    <div class="p-3 bg-[#d10000]">
      <nav class="flex space-x-5 justify-between items-center">
        <div>
          <RouterLink to="/" class="text-3xl text-white font-bold">DEVMIX</RouterLink>
        </div>

        <!--로그인 한 후 아이콘-->
        <template v-if="userStore.loginCheck">
          <div class="flex space-x-4">
            <button><img src="/img/bell.png" class="h-6 w-6" /></button>
            <RouterLink to="/projectcreate"><img src="/img/pen.png" class="h-6 w-6" /></RouterLink>
            <router-link to="/mypage" class="focus:outline-none">
              <img src="/img/person.png" class="h-6 w-5" />
            </router-link>
            <button @click="logout" class="text-white">로그아웃</button>
          </div>
        </template>

        <!--로그인 하기 전 아이콘-->
        <template v-else>
          <div class="flex space-x-5">
            <button class="focus:outline-none" @click.stop="modalLogin('login')">
              <img src="/img/person.png" class="h-6 w-5" />
            </button>
          </div>
        </template>
      </nav>
    </div>
  </header>

  <!--🙎‍♂️로그인 모달-->
  <div class="overlay" :class="{ isModal: isModal }"></div>
  <div class="modal p-5 w-96 rounded-lg" :class="{ isView: isModal }">
    <div class="flex items-center justify-between">
      <h1 class="text-lg text-black font-bold">로그인</h1>
      <button class="h-4 w-4" @click="modalLogin"><img src="/img/x.png" /></button>
    </div>

    <div class="m-5 justify-center">
      <div class="flex flex-col gap-3">
        <a href="http://localhost:8080/oauth2/authorization/google"><img src="/img/sns_G.png" /></a>
        <a href="http://localhost:8080/oauth2/authorization/kakao"><img src="/img/sns_k.png" /></a>
        <a href="http://localhost:8080/oauth2/authorization/naver"><img src="/img/sns_n.png" /></a>
      </div>
    </div>

    <p class="text-center text-xs text-gray-400">
      소셜 로그인 시 <br />
      이용약관, 개인정보처리방침, 전자금융거래약관에 동의함으로 처리됩니다.
    </p>
  </div>
</template>

<!--스크립트-->
<script setup>
import { ref, watchEffect } from 'vue';
import { useUserStore } from '@/store/user';
import { RouterLink, useRoute } from 'vue-router';

const isModal = ref(false);
const route = useRoute(); // 현재 라우트 정보를 가져옵니다.

const modalLogin = async () => {
  isModal.value = !isModal.value;
};

const userStore = useUserStore();

// 페이지가 로드될 때 토큰을 확인하고 로그인 상태 설정
watchEffect(() => {
  if (route.query.token) {
    localStorage.setItem('token', route.query.token); // 토큰을 localStorage에 저장
    userStore.login(); // 로그인 상태로 변경
  }
});

const logout = () => {
  localStorage.removeItem('token');
  userStore.logout(); // Pinia의 logout 메서드 호출
  alert('로그아웃 성공');
};
</script>

<!--스타일-->
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgb(0, 0, 0, 0.3);
  display: none;
}
.isModal {
  display: block;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1001;
  display: none;
}
.isView {
  display: block;
}
</style>
