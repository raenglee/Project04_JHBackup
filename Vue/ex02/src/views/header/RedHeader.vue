<template>
  <!--🔴헤더-->
  <header>
    <div class="p-3 bg-[#d10000]">
      <nav class="flex space-x-5 justify-between items-center">
        <div>
          <RouterLink to="/" class="text-3xl text-white font-bold">DEVMIX</RouterLink>
        </div>

        <!--🌐로그인 한 후 아이콘-->
        <template v-if="useStore.loginCheck">
          <div class="flex space-x-4">
            <RouterLink to="/projectview/:board_id">게시글상세 테스트용</RouterLink>
            <button><img src="/img/bell.png" class="h-6 w-6" /></button>
            <RouterLink to="/projectcreate"><img src="/img/pen.png" class="h-6 w-6" /></RouterLink>
            <RouterLink to="/mypage/myposts" class="focus:outline-none">
              <img src="/img/person.png" class="h-6 w-5" />
            </RouterLink>
            <button @click="logout" class="text-white">로그아웃</button>
            <p class="text-white">{{ useStore.nickname }} 님</p>
          </div>
        </template>

        <!--⛔로그인 하기 전 아이콘-->
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
        <!-- <a href="http://192.168.0.61:8080/oauth2/authorization/google"><img src="/img/sns_G.png" /></a>
        <a href="http://192.168.0.61:8080/oauth2/authorization/kakao"><img src="/img/sns_k.png" /></a>
        <a href="http://192.168.0.61:8080/oauth2/authorization/naver"><img src="/img/sns_n.png" /></a> -->

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
  <!--🙎‍♂️로그인 모달 끝-->
</template>

<!--스크립트-->
<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { RouterLink } from 'vue-router';
import { loginUsers, userProfile  } from '@/api/loginApi';

//모달
const isModal = ref(false);

const modalLogin = async () => {
  isModal.value = !isModal.value;
};

//로그인
const route = useRoute();
const router = useRouter();
const useStore = useUserStore();

// watchEffect(async () => {
//   const token = useStore.token; // Pinia 스토어에서 토큰 접근
//   if (token) {
//     localStorage.setItem('token', route.query.token);

//     try {
//       // 닉네임으로 사용자 존재 여부 확인
//       const data = await loginUsers();
//       if (data) {
//         // 사용자 존재 시 Pinia 상태에 로그인 정보 저장
//         useStore.login(data);
//         // 메인 페이지로 이동
//         router.push({ name: 'main' });
//       } else {
//         // 사용자 없음, 프로필 입력 페이지로 이동
//         router.push({ name: 'profile' });
//       }
//     } catch (err) {
//       console.error('사용자 확인 실패:', err);
//     }
//   }
// });

watchEffect(async () => {
  if (route.query.token) {
    localStorage.setItem('token', route.query.token);

    try {
      
      const data = await loginUsers();
      // 닉네임이 없을 경우 /profile로 이동
      if (!data.result.nickname) {
        router.push('/profile');
      } else {
        useStore.login(data.result); // 스토어에 데이터 저장
        router.push('/'); // 메인 페이지로 이동
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
});




// 로그아웃
const logout = () => {
  localStorage.removeItem('token');
  useStore.logout();
  alert('로그아웃 성공');
  router.push('/');
};
</script>

<!--스타일-->
<style scoped></style>
