<template>
  <div class="w-4/6 mx-auto">
    
          <!-- 탭 메뉴 -->
          <div class="flex-1 ml-5">
        <div class="flex justify-around pt-10 ">
          <RouterLink to="/mypage/myprofile" class="text-2xl px-4 py-1" active-class="font-bold">마이 페이지</RouterLink>
          <RouterLink to="/mypage/mylikeposts" class="px-4 py-2" active-class="font-bold">내 관심 글</RouterLink>
          <RouterLink to="/mypage/mycomments" class="px-4 py-2" active-class="font-bold">나의 댓글</RouterLink>
          
        </div>
        <!--라우터 뷰를 넣어야 vue안에 있는 내용들을 탭을 눌렀을 때도 보여줌-->
        <RouterView />
      </div>
     <div class="flex">

    </div>
  </div>
</template>

<script setup>
// import { useUserStore } from '@/store/user';

// const useStore = useUserStore();
</script>

<style lang="scss" scoped></style>
