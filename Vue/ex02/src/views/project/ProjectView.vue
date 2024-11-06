<template>
  <div class="w-4/6 mx-auto my-10">
    <section class="container mx-auto">
      <form @submit.prevent="handleSubmit" class="grid gap-y-5 px-20 py-10">
        <div class="justify-center items-center text-center space-y-3 pb-5">
          <p class="border border-[#d10000] rounded-full w-16 text-center m-auto">모집중</p>
          <h1 class="text-center font-bold text-2xl">{{ project.title }}</h1>
          <div class="flex space-x-2 items-center justify-center">
            <img src="/img/people.png" class="w-8 h-8" />
            <p>{{ projectStore.nickname }}</p>
          </div>
          <p class="text-gray-500 text-l text-right pr-10">조회수: {{ project.viewCount }}</p>
          <div class="my-3 mb-20">
            <hr class="border-t-4 border-[#d10000]" />
          </div>
        </div>

        <div class="justify-between grid grid-cols-9 gap-4 px-10">
          <div class="flex flex-col space-y-10 col-span-3">
            <div class="items-center">
              <label for="region" class="font-bold pr-2 text-lg">지역 / 구분</label>
              <p class="py-2 pl-2">{{ project.location }}</p> <!-- 지역 정보 표시 -->
            </div>
            <div class="items-center">
              <p class="font-bold pr-2 text-lg">진행 기간</p>
              <p class="py-2 pl-2">{{ project.projectPeriod }}</p>
            </div>
            <div class="items-center">
              <p class="font-bold pr-2 text-lg">기술 / 언어</p>
              <p class="py-2 pl-2">{{ techStack }}</p> <!-- 기술 스택을 문자열로 표시 -->
            </div>
          </div>
          <div class="col-span-2 pl-0">
            <p class="font-bold pr-2 text-lg">모집마감일</p>
            <p class="py-2 pl-2">{{ project.endDate }}</p>
          </div>
          <div class="space-y-4 col-span-4 pl-20">
            <p class="font-bold pr-2 text-lg">모집 현황</p>
            <div v-for="(position, index) in project.positionDtoList" :key="index" class="flex items-center space-x-10">
              <p class="pl-1">{{ position.positionName }}</p>
              <p class="p1-5">{{ position.currentCount }}</p> 
              <p class="p1-5">/</p>
              <p>{{ position.requiredCount }}</p>
              <button v-if="!position.applied && position.currentCount < position.requiredCount" @click="applyForPosition(index)" class="border border-gray-200 rounded-full pl-2 pr-2 text-base hover:bg-gray-200">
                지원
              </button>
              <p v-else-if="position.applied" class="text-gray-500">승인 대기중</p>
              <p v-else class="text-red-500">마감</p>
            </div>
          </div>
        </div>

        <h1 class="pt-20 pl-3 font-bold text-xl">프로젝트 소개</h1>
        <div class="mb-5">
          <hr class="border-t-4 border-[#d10000]" />
        </div>
        <p class="px-10 pb-6">{{ project.content }}</p>
        <div class="mb-1">
          <hr class="border-t-4 border-gray-200" />
        </div>
        <div class="flex justify-between mb-3 mx-7">
  <button @click="navigateToHome" class="border border-gray-200 rounded-full px-5 py-1 text-base hover:bg-gray-200">목록</button>
  <button class="border border-gray-200 rounded-full px-5 py-1 text-base hover:bg-[#d10000] hover:text-white hover:border-[#d10000]">수정</button>
</div>

        <!-- 댓글 작성 -->
        <div class="ml-30 justify-center items-center w-full">
          <div class="flex items-center">
            <img src="/img/people.png" class="w-8 h-8 ml-7" />
            <p class="ml-3">닉네임</p>
          </div>
          <div class="flex items-center w-full">
            <div class="item my-6 mx-7 justify-center" style="width: 90%">
              <textarea v-model="content" class="w-full p-3 h-20 border border-gray-200 rounded-md focus:outline-none  ring-gray-200 resize-none bg-gray-100"></textarea>
            </div>
            <div style="width: 10%">
              <button @click.prevent="addComment" class="border border-gray-200 rounded-md h-20 w-20 px-2 text-base hover:bg-gray-200">등록</button>
            </div>
          </div>
        </div>
          <!-- 댓글 목록 -->
          <div class="mt-5">
  <ul>
    <li v-for="comment in commentStore.comments" :key="comment.id" class="border-b py-3 flex items-start">
      <img :src="comment.profileImage" alt="Profile" class="w-8 h-8 mr-2 rounded-full" />
      <div class="flex-1">
        <div class="flex justify-between">
          <p class="font-bold">{{ comment.nickname }}</p>
          <p class="text-gray-500 text-sm">{{ comment.createdAt }}</p>
        </div>
        <p class="py-3">{{ comment.content }}</p>
      </div>
    </li>
  </ul>
</div>

  
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProjectStore } from '@/store/project'; // Pinia store import
import { loadProject } from '@/api/projectApi'; // API import

import { useCommentStore } from '@/store/comment'; // Pinia 스토어 import
import { loadComments } from '@/api/projectApi'; // 댓글을 가져오는 API 함수 import

import { useRouter, useRoute } from 'vue-router'; // Vue Router import


const route = useRoute(); // 현재 라우트 정보 가져오기

const loadProjectDetails = async () => {
  const boardNumber = route.params.boardNumber; // 라우트에서 boardNumber 파라미터 추출
  project.value = await loadProject(boardNumber); // API를 통해 게시글 데이터 가져오기
};

onMounted(() => {
  loadProjectDetails();
});




const projectStore = useProjectStore();
const project = projectStore; // Pinia store에서 프로젝트 가져오기
const content = ref('');

// 기술 스택을 문자열로 변환하는 computed property
const techStack = computed(() => {
  return project.techStackDtoList.length > 0 
    ? project.techStackDtoList.join(', ') 
    : '없음'; // 기술 스택이 없을 경우 '없음' 표시
});

// 프로젝트 데이터 로드
onMounted(async () => {
  const boardNumber = 1; // 예시 1번 게시물
  const data = await loadProject(boardNumber);

  // store에 데이터 저장
  projectStore.loadProject(data);
});

// 지원하기 기능
const applyForPosition = (index) => {
  if (!project.positionDtoList[index].applied) {
    project.positionDtoList[index].applied = true; // 지원 상태를 true로 변경
    // project.positionDtoList[index].currentCount++; // 카운트 증가
    alert(`${project.positionDtoList[index].positionName}에 지원했습니다.`);

    // 지원자가 모두 찼을 경우 마감 처리
    if (project.positionDtoList[index].currentCount >= project.positionDtoList[index].requiredCount) {
      project.positionDtoList[index].status = 'CLOSED'; // 상태를 'CLOSED'로 설정
    }
  } else {
    alert('이미 지원하셨습니다.');
  }
};




const commentStore = useCommentStore();

// 댓글 데이터 로드
onMounted(async () => {
  const boardNumber = 1; //await loadComments(); // API로부터 댓글 데이터 가져오기
  const commentData = await loadComments(boardNumber);
  commentStore.loadComments(commentData); // 스토어에 댓글 데이터 저장
});


// Vue Router 인스턴스 가져오기
const router = useRouter();

// 목록 버튼 클릭 시 홈으로 이동
const navigateToHome = () => {
  router.push('/');

};
</script>

<style lang="scss" scoped></style>
