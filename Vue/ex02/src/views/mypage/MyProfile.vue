<template>
  <div>
    <div class="my-3">
      <hr class="border-t-4 border-[#d10000]" />
    </div>
    <!-- 😀개인 정보-->
    <div class="">
      <img class="h-20 w-20 m-auto" src="/img/people.png" />
      <div class="pt-3 justify-center text-center">{{ useStore.nickname }}님</div>
      <div class="pt-1 text-sm text-gray-500">{{ useStore.email }}</div>
      <div class="flex justify-center text-center py-3">
        <RouterLink to="/mypage/myprofileedit"><button class="border border-gray-300 rounded-md py-1 px-3 mx-1">프로필 수정</button></RouterLink>
        <button class="border border-gray-300 rounded-md py-1 px-2">공유</button>
      </div>
      <div class="y-5 justify-center text-center">
        <h2 class="font-bold text-xl">소속</h2>
        <p class="py-2">소속{{ useStore.groupName }}</p>
        <h2 class="font-bold text-xl">포지션</h2>
        <p class="py-2">포지션data</p>
        <h3 class="font-bold text-xl">지역</h3>
        <p class="py-2">지역{{ useStore.location }}</p>
        <h2 class="font-bold text-xl">기술 스택</h2>
        <p class="py-2">기술data</p>
      </div>
    </div>
    <!--😀개인 정보 끝 -->
  </div>
</template>

<script setup>
// import { getPositions, getTechstacks } from '@/api/projectApi';
import { useUserStore } from '@/store/user';
import { onMounted, ref } from 'vue';

const useStore = useUserStore();

//포지션 서버 연결
// const roleOptions = ref([]); // 서버에서 전달 받은 포지션 저장

// 포지션 서버 연결
// const updatePositions = async () => {
//   try {
//     const res = await getPositions();
//     // console.log('updatePsotions 데이터 확인 : ', res);
//     if (Array.isArray(res.data.result)) {
//       roleOptions.value = res.data.result; // 목록이 이름 하나이므로 배열에 넣을 필요X
//     } else {
//       console.error('분야별 모집 인원 배열 저장 에러', res);
//     }
//   } catch (error) {
//     console.error('실패:', error);
//   }
// };

//기술 서버 연결
// const techOptions = ref([]); // 서버에서 전달 받은 기술 저장

// 기술 / 언어 데이터 연결
// const updateTechstacks = async () => {
//   try {
//     const res = await getTechstacks();
//     // console.log('updateTechstacks 데이터 확인: ', res);
//     // techOptions.value = res.result; // 받아온 기술 목록을 techOptions에 저장
//     if (Array.isArray(res)) {
//       techOptions.value = res.map((item) => ({
//         // 받아오는 정보가 두개이상이므로 map으로 가져온다.
//         techStackName: item.techStackName,
//         imageUrl: item.imageUrl
//       }));
//     } else {
//       console.error('기술/언어 배열 저장 에러', res);
//     }
//   } catch (error) {
//     console.error('실패:', error);
//   }
// };

// 이벤트 리스너
onMounted(() => {
  // updateTechstacks(); // 기술, 언어 API 호출
  // updatePositions(); // 포지션 API 호출
});
</script>

<style lang="scss" scoped></style>
