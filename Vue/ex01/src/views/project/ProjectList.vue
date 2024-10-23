<template>
  <div class="bg-white">
    <!-- 메인 섹션 -->
    <section class="container mx-auto py-8">
      <h1 class="text-4xl font-bold text-center mb-6">현재 모집 중인 프로젝트를 확인해보세요!</h1>

      <div class="flex items-center">
        <form action="#">
          <select name="" size="1" class="px-4 py-1 my-5 border border-gray rounded-full cursor-pointer outline-none">
            <option selected>구별</option>
            <option>온라인</option>
            <option>서울</option>
            <option>대구</option>
            <option>부산</option>
          </select>
        </form>

        <form action="#" class="px-5">
          <select name="" size="1" class="px-4 py-1 my-5 border border-gray rounded-full cursor-pointer outline-none">
            <option selected>포지션</option>
            <option>프론트엔드</option>
            <option>백엔드</option>
            <option>디자이너</option>
            <option>PM</option>
            <option>기획자</option>
            <option>데브옵스</option>
            <option>안드로이드 개발자</option>
            <option>IOS 개발자</option>
            <option>크로스 플랫폼 개발자</option>
          </select>
        </form>

        <form action="#">
          <select name="" size="1" class="px-4 py-1 my-5 border border-gray rounded-full cursor-pointer outline-none">
            <option selected>기술 / 언어</option>
            <option>JAVA</option>
            <option>JavaScript</option>
            <option>PHP</option>
            <option>Python</option>
            <option>C#</option>
            <option>Figma</option>
          </select>
        </form>

        <div class="flex items-center border border-gray-300 rounded-full px-4 py-1">
          <span class="text-gray-500 mr-2">#</span>
          <input type="text" placeholder="검색어를 입력하세요" class="flex-grow focus:outline-none" v-model="searchText" />
          <img src="/img/search.png" class="h-5 w-5" />
        </div>
      </div>

      <!-- 프로젝트 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="border rounded-2xl shadow-md p-6 bg-white relative">
          <!-- 모집일 및 북마크 -->
          <div class="absolute top-4 right-4 flex items-center space-x-2 z-10 bg-white px-2">
            <div class="text-sm text-gray-500">마감일 2023.05.25</div>
            <button class="text-blue-500">북마크</button>
          </div>

          <!-- 프로젝트 제목 -->
          <h2 class="text-lg font-semibold mt-12 mb-2">제목</h2>
          <!-- 모집 인원 -->
          <p class="text-sm text-gray-700 mb-4">현재 인원: 2/3</p>
          <!-- 기술 아이콘 -->
          <div class="flex space-x-2 mb-4">
            <img src="https://via.placeholder.com/20" alt="기술1" class="w-6 h-6" /> 기술1 <img src="https://via.placeholder.com/20" alt="기술2" class="w-6 h-6" /> 기술2
            <img src="https://via.placeholder.com/20" alt="기술3" class="w-6 h-6" /> 기술3
          </div>
        </div>
      </div>

      <!-- 모집 프로젝트 개수 -->
      <div class="text-center mt-8">
        <span class="font-semibold text-lg"> 현재 DEVMIX에서 모집 중인 프로젝트 <span class="text-[#D10000]">76건</span> </span>
      </div>

      <!-- 페이지네이션 -->
      <div class="flex justify-center mt-8 space-x-2">
        <button class="px-4 py-2">1</button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const dropDownOpen = ref(false);

    const dropDown = () => {
      dropDownOpen.value = !dropDownOpen.value;
    };

    return {
      dropDownOpen,
      dropDown
    };
  }
};
</script>
