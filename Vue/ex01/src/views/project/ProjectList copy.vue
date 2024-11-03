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
        <font-awesome-icon :icon="activeDropdown === 'tech' ? 'chevron-up' : 'chevron-down'" class="text-gray-300 pl-2" />      </div>
      <div v-if="activeDropdown === 'location'" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4">
        <div class="flex flex-col">
          <div v-for="(option, index) in locationOptions" :key="index" class="flex items-center p-1">
            <label :class="{'text-gray-400': selectedLocation === option}" 
                   @click="selectLocation(option)"
                   class="cursor-pointer">
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
        <font-awesome-icon :icon="activeDropdown === 'tech' ? 'chevron-up' : 'chevron-down'" class="text-gray-300 pl-2" />      </div>
      <div v-if="activeDropdown === 'position'" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4">
        <div class="flex flex-col">
          <div v-for="(option, index) in positionOptions" :key="index" class="flex items-center p-1">
            <label :class="{'text-gray-400': selectedPosition === option}" 
                   @click="selectPosition(option)"
                   class="cursor-pointer">
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
        <font-awesome-icon :icon="activeDropdown === 'tech' ? 'chevron-up' : 'chevron-down'" class="text-gray-300 pl-2" />
      </div>
      <div v-if="activeDropdown === 'tech'" class="absolute bg-white border border-gray rounded-md z-10 w-96 p-4">
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(option, index) in techOptions" :key="index" class="flex items-center">
            <label :class="{'text-gray-300': selected.includes(option)}" 
                   @click="toggleTechSelection(option)"
                   class="cursor-pointer">
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

          <!-- <button class="px-4 py-1 my-5 border border-[#d10000] rounded-full outline-none" @click="clickneededonly">모집중만 보기</button>-->
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
              <div class="border px-2 rounded-full mb-2 bg-gray-300">지역</div>
              <font-awesome-icon
                :icon="isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                :class="[isBookmarked ? 'text-[#7371fc]' : 'text-gray-400', 'cursor-pointer']"
                style="font-size: 22px"
                @click="toggleBookmark"
              />
            </div>
            <div class="text-sm mb-2">마감일 | {{ item.endDate }}</div>
            <div class="text-2xl font-bold mb-2">{{ item.title }}</div>
            <div class="flex p-3 gap-7 mb-1">
              <span class="flex flex-col size-5 items-center text-sm"
                ><img src="/img/figma.png" />
                <!-- <SvgIcon src="@/assets/svg/figma.svg" /> -->
                Figma
              </span>
              <span class="flex flex-col size-8 items-center text-sm"
                ><img src="/img/springboot.png" />
                <!-- <SvgIcon src="@/assets/svg/figma.svg" /> -->
                Spring
              </span>
            </div>
            <div class="flex flex-col">
              <div class="ml-auto mb-1">{{ item.userNickname }}</div>
              <div class="flex justify-between">
                <div class="text-sm">인원 n/n</div>
                <div><font-awesome-icon icon="eye" class="text-gray-400" /> {{ item.viewCount }} <font-awesome-icon icon="comment" class="text-gray-400" /> 30</div>
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
      <div class="flex justify-center mt-8 space-x-2">
        <button class="px-4 py-2">1</button>
      </div>
    </section>
  </div>

  <div class="bottom bg-[#d10000] bottom-0 left-0 w-full text-white text-center">DEVMIX</div>
</template>

<!--스크립트-->
<script setup>
import { ref, watchEffect } from 'vue';

const searchText = ref('');
const onlyBookmarked = ref(false);
const onlyNeeded = ref(false);
const isBookmarked = ref(false);

const arr = ref([]);

const clickBookmarkonly = () => {
  onlyBookmarked.value = !onlyBookmarked.value;
  console.log('북마크만 보기');
};

const clickneededonly = () => {
  onlyNeeded.value = !onlyNeeded.value;
  console.log('모집중만 보기');
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value; //
};

//드롭다운
import { onMounted, onUnmounted } from 'vue';

// 포지션 드롭다운
const positionOptions = ref([
  '프론트엔드',
  '백엔드',
  '디자이너',
  'PM',
  '기획자',
  '데브옵스',
  '안드로이드 개발자',
  'IOS 개발자',
  '크로스 플랫폼 개발자',
]);
const selectedPosition = ref(''); // 단일 선택
// 기술/언어 드롭다운
const techOptions = ref(['JAVA', 'JavaScript', 'PHP', 'Python', 'C#', 'Figma', 'Vue', 'Node.js', 'React', 'Django']);
const selected = ref([]); // 다중 선택
// 지역/구분 드롭다운
const locationOptions = ref([
  '온라인',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '기타',
]);
const selectedLocation = ref(''); // 단일 선택

const activeDropdown = ref(''); // 현재 활성화된 드롭다운

const toggleDropdown = (dropdown) => {
  // 열려 있는 드롭다운이 있다면 닫고, 선택한 드롭다운을 열기
  activeDropdown.value = activeDropdown.value === dropdown ? '' : dropdown;
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





//프로젝트 가져오기 -> 백 미완성
// watchEffect(async () => {
//   const res = await listProject();
//   console.log(res.data.list);
//   arr.value = res.data.list;
// });
</script>
