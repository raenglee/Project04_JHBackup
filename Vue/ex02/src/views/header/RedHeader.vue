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
          <div class="flex space-x-1">
            <font-awesome-icon icon="bell" class="h-6 w-5 cursor-pointer p-2 text-white hover:bg-[#ffffff] hover:text-[#d10000]" />
            <RouterLink to="/projectcreate">
              <font-awesome-icon icon="pen" class="h-6 w-5 cursor-pointer p-2 text-white hover:bg-[#ffffff] hover:text-[#d10000]" />
            </RouterLink>
            <div class="relative">
              <font-awesome-icon
                icon="user"
                class="h-6 w-5 cursor-pointer p-2"
                :class="{
                  'text-[#d10000] bg-white': isPeopleDropdownOpen,
                  'text-white hover:bg-[#ffffff] hover:text-[#d10000]': !isPeopleDropdownOpen
                }"
                @click="toggleDropdown"
                @mouseover="openDropdown"
                @mouseleave="closeDropdown"
              />

              <!-- 드롭다운 메뉴 -->
              <div v-if="isPeopleDropdownOpen" class="absolute right-0 top-10 w-max min-w-[150px] max-w-[300px] bg-white rounded-m z-10 shadow-[0_4px_3px_0_rgba(0,0,0,0.1)]">
                <ul class="text-sm">
                  <li>
                    <p class="px-4 py-2 font-bold text-lg">반갑습니다 {{ useStore.nickname }} 님!</p>
                  </li>
                  <li>
                    <RouterLink to="/mypage" class="block px-4 py-2 text-gray-800 hover:bg-[#d1000020]" @click="toggleDropdown"> 마이 페이지 </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/projectmanagement/myproject" class="block px-4 py-2 text-gray-800 hover:bg-[#d1000020]" @click="toggleDropdown"> 프로젝트 관리 </RouterLink>
                  </li>
                  <li>
                    <button @click="logout" class="block w-full px-4 py-2 text-gray-800 hover:bg-[#d1000020] text-left">로그아웃</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>

        <!--⛔로그인 하기 전 아이콘-->
        <template v-else>
          <div class="flex space-x-5">
            <button class="focus:outline-none" @click.stop="modalLogin('login')">
              <!-- <img src="/img/person.png" class="h-6 w-5" /> -->
              <font-awesome-icon icon="user" class="h-6 w-5 cursor-pointer text-white" />
            </button>
          </div>
        </template>
      </nav>
    </div>
  </header>

  <!--🙎‍♂️로그인 모달-->
  <div class="overlay" :class="{ isModal: isModal }" @click="closeModal"></div>
  <transition name="modal-fade">
    <div v-if="isModal" class="modal p-5 w-96 rounded-lg" :class="{ isView: isModal }">
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
  </transition>
  <!--🙎‍♂️로그인 모달 끝-->
</template>

<!--스크립트-->
<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { RouterLink } from 'vue-router';
import { loginUsers } from '@/api/loginApi';

//모달
const isModal = ref(false);

const modalLogin = async () => {
  isModal.value = !isModal.value;
};

// 모달 닫기 (배경 클릭 시)
const closeModal = () => {
  isModal.value = false;
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

// 드롭다운 상태 관리
const isPeopleDropdownOpen = ref(false);

// 드롭다운 토글 함수 (이미지 클릭 시)
const toggleDropdown = () => {
  isPeopleDropdownOpen.value = !isPeopleDropdownOpen.value;
};

// 외부 클릭 시 드롭다운 닫기
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isPeopleDropdownOpen.value = ''; // 모든 드롭다운 닫기
  }
};

// 호버 시 드롭다운을 열기
const openDropdown = () => {
  isPeopleDropdownOpen.value = true;
};

// 호버를 벗어나면 드롭다운을 닫기
const closeDropdown = () => {
  if (!isPeopleDropdownOpen.value) {  // 클릭으로 열린 상태라면, 닫히지 않도록 방지
    isPeopleDropdownOpen.value = false;
  }
};

// 로그아웃 함수
const logout = () => {
  localStorage.removeItem('token');
  useStore.logout();
  alert('로그아웃 성공');
  router.push('/');
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<!--스타일-->
<style scoped></style>
