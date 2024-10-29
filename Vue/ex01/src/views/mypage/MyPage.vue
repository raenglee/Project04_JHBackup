<template>
  <div class="w-4/6 mx-auto">
    <h1 class="pt-10 font-bold text-2xl">마이페이지</h1>
    <div class="my-3 mb-10">
      <hr class="border-t-4 border-[#d10000]" />
    </div>
    <div class="flex">
      <!--😀개인 정보-->
      <div class="flex flex-col border border-gray-300 w-72 justify-center text-center p-8">
        <div>
          <img class="h-20 w-20 m-auto" src="/img/people.png" />
          <div class="pt-3">{{ useStore.nickname }}님</div>
          <div class="pt-1 text-sm text-gray-500">{{ useStore.email }}</div>
          <div class="flex justify-center text-center py-3">
            <button class="border border-gray-300 rounded-md py-1 px-3 mx-1">프로필 수정</button>
            <button class="border border-gray-300 rounded-md py-1 px-2">공유</button>
          </div>
          <div class="y-5">
            <h2 class="font-bold text-xl">소속</h2>
            <p class="py-2">소속data</p>
            <h2 class="font-bold text-xl">포지션</h2>
            <p class="py-2">포지션data</p>
            <h3 class="font-bold text-xl">지역</h3>
            <p class="py-2">지역data</p>
            <h2 class="font-bold text-xl">기술 스택</h2>
            <p class="py-2">기술 스택data</p>
          </div>
        </div>
      </div>
      <!--😀개인 정보 끝-->
      <!-- 탭 메뉴 -->
      <div class="flex-1 ml-5">
        <div class="flex justify-around">
          <RouterLink to="/mypage/myposts" class="px-4 py-2" active-class="font-bold border-b-2 border-[#d10000]">작성한 글</RouterLink>
          <RouterLink to="/mypage/mycomments" class="px-4 py-2" active-class="font-bold border-b-2 border-[#d10000]">나의 댓글</RouterLink>
          <RouterLink to="/mypage/myprojects" class="px-4 py-2" active-class="font-bold border-b-2 border-[#d10000]">참여 프로젝트</RouterLink>
          <RouterLink to="/mypage/mylikeposts" class="px-4 py-2" active-class="font-bold border-b-2 border-[#d10000]">내 관심 글</RouterLink>
        </div>
        <!--라우터 뷰를 넣어야 vue안에 있는 내용들을 탭을 눌렀을 때도 보여줌-->
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';

const useStore = useUserStore();
</script>

<style lang="scss" scoped></style>
