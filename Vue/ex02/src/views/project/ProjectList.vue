<template>
  <div class="bg-white">
    <!--🟥메인 박스-->
    <section class="container mx-auto py-8 w-4/6">
      <h1 class="text-4xl font-bold text-center mb-6 animate-slideUp py-10">현재 모집 중인 프로젝트를 확인해보세요!</h1>

      <!--🔍서치 박스-->
      <div class="flex items-center justify-between mb-3">
        <div class="flex gap-4">
          <div class="flex">
            <!-- 지역/구분 드롭다운 -->
            <div class="relative">
              <div @click="toggleDropdown('location')" class="min-w-36 px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
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
            <div @click="toggleDropdown('position')" class="min-w-28 px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
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
            <div @click="toggleDropdown('tech')" class="min-w-36 px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
              <span>기술 / 언어</span>
              <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
            </div>
            <div v-if="activeDropdown === 'tech'" class="absolute bg-white border border-gray rounded-md z-10 p-4" style="width: 600px">
              <!--드롭다운 내부-->
              <div class="flex gap-2">
                <botton type="button" class="bg-whith border border-gray-200 px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300">전체</botton>
                <botton type="button" class="bg-whith border border-gray-200 px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300">백 엔드</botton>
                <botton type="button" class="bg-whith border border-gray-200 px-2 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300">프론트 엔드</botton>
              </div>

              <div class="grid grid-cols-10 gap-x-3 gap-y-3 mt-3">
                <div v-for="(option, index) in techOptions" :key="index" class="flex items-center m-auto">
                  <label :class="{ 'text-gray-300 opacity-20': selected.includes(option) }" @click="toggleTechSelection(option)" class="cursor-pointer">
                    <img :src="option.imageUrl" class="w-10 h-12 item-center hover:w-12" />
                    <!-- <p class="hover_text">{{ option.techStackName }}</p> -->
                  </label>
                </div>
              </div>
              <div class="mt-5">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold mb-1">선택 항목</span>
                  <botton @click="resetSelection" type="button" class="text-sm text-gray-400 px-1 mb-1 cursor-pointer hover:text-gray-300">초기화</botton>
                </div>
                <div class="flex flex-wrap">
                  <span v-for="(item, index) in selected" :key="index" class="mr-3 border border-gray-200 text-sm rounded-full px-2 py-1 mt-1">
                    <p>{{ item.techStackName }}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            class="min-w-36 max-h-8 px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none"
            :class="{
              'bg-[#d10000] text-white': onlyBookmarked,
              'bg-white text-black': !onlyBookmarked
            }"
            @click="clickBookmarkonly"
          >
            북마크만 보기
          </button>

          <button
            class="min-w-36 max-h-8 px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none"
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
              <div class="border px-2 rounded-full mb-2 bg-gray-200">{{ item.location }}</div>
              <font-awesome-icon
                :icon="item.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                :class="[item.isBookmarked ? 'text-[#7371fc]' : 'text-gray-400', 'cursor-pointer']"
                style="font-size: 22px"
                @click="toggleBookmark(item)"
              />
            </div>
            <div class="text-sm mb-2">마감일 | {{ item.recruitEndDate }}</div>
            <div class="text-xl font-bold mb-2">{{ item.title }}</div>
            <!--기술 아이콘-->
            <div class="flex pt-2 gap-3 mb-1">
              <div v-for="tech in item.techStacks" :key="tech">
                <img class="w-10 h-10" :src="tech.techStackImageUrl" />
              </div>
            </div>
            <div class="flex flex-col">
              <div class="ml-auto mb-1">{{ item.userNickname }} 닉네임</div>
              <div class="flex justify-between">
                <div v-for="count in item.positions" :key="count">
                  <div class="text-sm">인원 {{ totalPeople }}</div>
                </div>
                <div>
                  <font-awesome-icon icon="eye" class="text-gray-400 mx-1" />
                  {{ item.viewCount }}
                  <font-awesome-icon icon="comment" class="text-gray-400 mx-1" />
                  {{ item.commentCount }}
                </div>
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
      <!-- <div class="flex justify-center mt-5">
        <ul class="flex space-x-2">
          <li class="cursor-pointer p-3" v-for="(num, index) in totalPages" v-bind:key="index" @click="setPageNum(num - 1)">
            {{ num }}
          </li>
        </ul>
      </div> -->
    </section>
  </div>

  <div class="bottom bg-[#d10000] bottom-0 left-0 w-full text-white text-center">DEVMIX</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { getTechstacks, listProject } from '@/api/projectApi';

const searchText = ref('');
const onlyBookmarked = ref(false);
const onlyNeeded = ref(false);
const arr = ref([]); // 게시물 배열

//총 인원
const positions = ref([{ positionName: '', requiredCount: 1 }]);

const totalPeople = computed(() => {
  console.log('총 인원알아보기: ', positions.value);

  return positions.value.reduce((sum, position) => {
    return sum + (position.requiredCount || 0);
  }, 0);
});

// 프로젝트 가져오기
const getProjects = async () => {
  try {
    const res = await listProject();
    arr.value = res.map((item) => ({ ...item, isBookmarked: false }));
  } catch (error) {
    console.error('프로젝트 가져오기 오류:', error);
  }
};

// onMounted(getProjects);

const clickBookmarkonly = () => {
  onlyBookmarked.value = !onlyBookmarked.value;
};

const clickneededonly = () => {
  onlyNeeded.value = !onlyNeeded.value;
};

// 특정 게시물의 북마크 상태 변경
const toggleBookmark = (item) => {
  item.isBookmarked = !item.isBookmarked; // 누른 게시물 북마크 상태 반전
  localStorage.setItem('bookmarkedItems', JSON.stringify(arr.value)); // 로컬 스토리지에 저장
};

// 포지션 드롭다운
const positionOptions = ref(['프론트엔드', '백엔드', '디자이너', 'PM', '기획자', '데브옵스', '안드로이드 개발자', 'IOS 개발자', '크로스 플랫폼 개발자']);
const selectedPosition = ref(''); // 단일 선택

// 기술/언어 드롭다운
const techOptions = ref([]);
const selected = ref([]); // 다중 선택

const slelctTechstacks = async () => {
  try {
    const res = await getTechstacks();
    console.log('selectTechstacks 가져오기 : ', res);
    // techOptions.value = res.result; // 받아온 기술 목록을 techOptions에 저장
    if (Array.isArray(res.data.result)) {
      techOptions.value = res.data.result.map((item) => ({
        // 받아오는 정보가 두개이상이므로 map으로 가져온다.
        techStackName: item.techStackName,
        imageUrl: item.imageUrl
      }));
    } else {
      console.error('기술 배열 저장 에러: ', res.data.result);
    }
  } catch (error) {
    console.error('기술 배열 가져오기 실패:', error);
  }
};

const resetSelection = () => {
  selected.value = []; // 선택된 항목을 모두 해제
};

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
  getProjects();
  slelctTechstacks();
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
