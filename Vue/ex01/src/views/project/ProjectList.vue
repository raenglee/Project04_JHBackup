<template>
  <div class="bg-white">
    <!--🟥메인 박스-->
    <section class="container mx-auto py-8">
      <h1 class="text-4xl font-bold text-center mb-6 animate-slideUp py-10">현재 모집 중인 프로젝트를 확인해보세요!</h1>

      <!--🔍서치 박스-->
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <div class="flex">
            <!-- 지역/구분 드롭다운 -->
            <div class="relative">
              <div @click="toggleDropdown('location')" class="px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
                <span v-if="selectedLocation">{{ selectedLocation }}</span>
                <span v-else>지역 / 구분</span>
                <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
              </div>
              <div v-if="activeDropdown === 'location'" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4">
                <div class="flex flex-col">
                  <div v-for="(option, index) in locationOptions" :key="index" class="flex items-center p-1">
                    <label :class="{ 'text-gray-400': selectedLocation === option }" @click="selectLocation(option)" class="cursor-pointer">
                      {{ option }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 포지션 드롭다운 -->
          <div class="relative">
            <div @click="toggleDropdown('position')" class="px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
              <span v-if="selectedPosition">{{ selectedPosition }}</span>
              <span v-else>포지션</span>
              <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
            </div>
            <div v-if="activeDropdown === 'position'" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4">
              <div class="flex flex-col">
                <div v-for="(option, index) in positionOptions" :key="index" class="flex items-center p-1">
                  <label :class="{ 'text-gray-400': selectedPosition === option }" @click="selectPosition(option)" class="cursor-pointer">
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 기술/언어 드롭다운 -->
          <div class="relative">
            <div @click="toggleDropdown('tech')" class="px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
              <span>기술 / 언어</span>
              <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
            </div>
            <div v-if="activeDropdown === 'tech'" class="absolute bg-white border border-gray rounded-md z-10 w-96 p-4">
              <div class="grid grid-cols-4 gap-4">
                <div v-for="(option, index) in techOptions" :key="index" class="flex items-center">
                  <label :class="{ 'text-gray-300': selected.includes(option) }" @click="toggleTechSelection(option)" class="cursor-pointer">
                    {{ option }}
                  </label>
                </div>
              </div>
              <div class="mt-5">
                <span class="text-sm font-semibold">선택한 것</span>
                <div class="flex flex-wrap">
                  <span v-for="(item, index) in selected" :key="index" class="mr-3 bg-gray-200 text-sm rounded-full px-2 py-1 mt-2">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            class="px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none"
            :class="{
              'bg-[#d10000] text-white': onlyBookmarked,
              'bg-white text-black': !onlyBookmarked
            }"
            @click="clickBookmarkonly"
          >
            북마크만 보기
          </button>

          <button
            class="px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none"
            :class="{
              'bg-[#d10000] text-white': onlyNeeded,
              'bg-white text-black': !onlyNeeded
            }"
            @click="clickneededonly"
          >
            모집중만 보기
          </button>
        </div>

        <div class="flex items-center border border-gray-300 rounded-full px-4 py-1">
          <input type="text" placeholder="# 검색어를 입력하세요" class="flex-grow focus:outline-none" v-model="searchText" />
          <button><img src="/img/search.png" class="h-5 w-5" /></button>
        </div>
      </div>
      <!--서치 박스 끝-->

      <!--📝프로젝트 글 박스-->
      <template v-if="arr && arr.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <div v-for="item in arr" :key="item.id" class="border rounded-2xl p-4 relative">
            <div class="top-4 flex items-center justify-between">
              <div class="border px-2 rounded-full mb-2 bg-gray-200">{{ selectedLocation }} 지역</div>
              <font-awesome-icon
                :icon="item.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                :class="[item.isBookmarked ? 'text-[#7371fc]' : 'text-gray-400', 'cursor-pointer']"
                style="font-size: 22px"
                @click="toggleBookmark(item)"
              />
            </div>
            <div class="text-sm mb-2">마감일 | {{ item.recruitEndDate }}</div>
            <div class="text-2xl font-bold mb-2">{{ item.title }}</div>
            <div class="flex p-3 gap-7 mb-1">
              <!-- 기술 아이콘 부분은 필요에 따라 추가 -->
            </div>
            <div class="flex flex-col">
              <div class="ml-auto mb-1">{{ item.userNickname }} 닉네임</div>
              <div class="flex justify-between">
                <div class="text-sm">인원 n/n</div>
                <div><font-awesome-icon icon="eye" class="text-gray-400 mx-1" /> {{ item.viewCount }} <font-awesome-icon icon="comment" class="text-gray-400 mx-1" />{{ item.commentCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!--프로젝트 글 박스 끝-->

      <div class="text-center mt-10 mb-10">
        <span class="font-semibold text-3xl"> 현재 DEVMIX에서 모집 중인 프로젝트 <span class="text-[#D10000]">N</span>건</span>
      </div>

      <!--페이지-->
      <div class="flex justify-center mt-5">
        <ul class="flex space-x-2">
          <li class="cursor-pointer p-3" v-for="(num, index) in totalPages" v-bind:key="index" @click="setPageNum(num - 1)">
            {{ num }}
          </li>
        </ul>
      </div>
    </section>
  </div>

  <div class="bottom bg-[#d10000] bottom-0 left-0 w-full text-white text-center">DEVMIX</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { listProject } from '@/api/projectApi';

const searchText = ref('');
const onlyBookmarked = ref(false);
const onlyNeeded = ref(false);
const arr = ref([]); // 게시물 배열

// 프로젝트 가져오기
const fetchProjects = async () => {
  try {
    const res = await listProject();
    arr.value = res.map((item) => ({ ...item, isBookmarked: false })); // 각 게시물에 북마크 상태 추가
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// 컴포넌트가 마운트될 때 프로젝트 데이터 가져오기
onMounted(fetchProjects);

const clickBookmarkonly = () => {
  onlyBookmarked.value = !onlyBookmarked.value;
};

const clickneededonly = () => {
  onlyNeeded.value = !onlyNeeded.value;
};

// 특정 게시물의 북마크 상태를 토글하는 함수
const toggleBookmark = (item) => {
  item.isBookmarked = !item.isBookmarked; // 해당 게시물의 북마크 상태 반전
  localStorage.setItem('bookmarkedItems', JSON.stringify(arr.value)); // 로컬 스토리지에 저장 (필요 시)
};

//페이지 수
const totalPages = ref(10);
const pageNum = ref(0);

const setPageNum = async (num) => {
  console.log('setPageNum 호출됨, 페이지 번호:', num);
  pageNum.value = num;

  try {
    const res = await listProject(num + 1); // 페이지 번호 1부터 시작

    if (res && res.data) {
      arr.value = res.data.list || []; // 데이터가 없으면 빈 배열로 초기화
      totalPages.value = res.data.totalPages || 0; // 총 페이지 수 설정
      console.log('API 응답 데이터:', res.data);
    } else {
      console.error('API 응답 오류:', res);
      arr.value = []; // 오류 발생 시 배열 초기화
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    arr.value = []; // 오류 발생 시 배열 초기화
  }
};

watchEffect(async () => {
  try {
    const res = await listProject(); // 기본 페이지 요청
    if (res && res.data) {
      arr.value = res.data.list || []; // 데이터가 없으면 빈 배열로 초기화
      totalPages.value = res.data.totalPages || 0; // 총 페이지 수 설정
      console.log('초기 API 응답 데이터:', res.data); // 초기 로드 데이터 로깅
    }
  } catch (error) {
    console.error('초기 API 요청 중 오류 발생:', error);
  }
});

// const setPageNum = async (num) => {
//   console.log('setPageNum 호출됨, 페이지 번호:', num);
//   pageNum.value = num;
//   const res = await listProject(num);
//   console.log('페이지' + res);
//   arr.value = res.data.list;
//   totalPages.value = res.data.totalPages;
// };

// watchEffect(async () => {
//   const res = await listProject(1); // 기본적으로 1페이지부터 호출
//   if (res && res.data) {
//     arr.value = res.data.list; // 데이터가 있을 경우 배열에 할당
//     totalPages.value = res.data.totalPages; // 총 페이지 수 설정
//   } else {
//     console.error('API 응답 오류:', res);
//     arr.value = []; // 오류 발생 시 배열 초기화
//   }
// });

// watchEffect(async () => {
//   const res = await listProject();
//   console.log(res);
//   arr.value = res.data.list;
// });

// 포지션 드롭다운
const positionOptions = ref(['프론트엔드', '백엔드', '디자이너', 'PM', '기획자', '데브옵스', '안드로이드 개발자', 'IOS 개발자', '크로스 플랫폼 개발자']);
const selectedPosition = ref(''); // 단일 선택
// 기술/언어 드롭다운
const techOptions = ref(['JAVA', 'JavaScript', 'PHP', 'Python', 'C#', 'Figma', 'Vue', 'Node.js', 'React', 'Django']);
const selected = ref([]); // 다중 선택
// 지역/구분 드롭다운
const locationOptions = ref(['온라인', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '기타']);
const selectedLocation = ref(''); // 단일 선택

const activeDropdown = ref(''); // 현재 활성화된 드롭다운

const toggleDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? '' : dropdown; // 드롭다운 열기/닫기
};

const selectPosition = (option) => {
  selectedPosition.value = option;
  activeDropdown.value = ''; // 드롭다운 닫기
};

const toggleTechSelection = (option) => {
  const index = selected.value.indexOf(option);
  if (index === -1) {
    selected.value.push(option);
  } else {
    selected.value.splice(index, 1);
  }
};

const selectLocation = (option) => {
  selectedLocation.value = option;
  activeDropdown.value = ''; // 드롭다운 닫기
};

// 외부 클릭 시 드롭다운 닫기
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeDropdown.value = ''; // 모든 드롭다운 닫기
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
