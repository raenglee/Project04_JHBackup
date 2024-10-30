<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
      <!-- 제목 -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">프로젝트 생성</h2>

      <form class="space-y-6">
        <!-- 프로젝트 명 -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">프로젝트 명</label>
          <input type="text" placeholder="프로젝트 명을 입력하세요." class="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <!-- 지역, 진행 기간, 모집 마감일 -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">지역</label>
            <select class="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <option>온라인</option>
              <option>오프라인</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">진행 기간</label>
            <select class="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <option>단발</option>
              <option>장기</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">모집 마감일</label>
            <input type="date" class="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <!-- 기술 / 언어 -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">기술 / 언어 (최대 10개)</label>
          <div class="flex items-center space-x-4">
            <select v-model="selectedSkill" @change="addSkill" class="w-1/3 p-2 border border-gray-300 rounded-full">
              <option disabled value="">기술을 선택하세요</option>
              <option v-for="tech in techOptions" :key="tech">{{ tech }}</option>
            </select>
            <div class="flex flex-wrap">
              <div v-for="(skill, index) in selectedSkills" :key="index" class="bg-gray-100 p-2 rounded-full m-1 flex items-center space-x-2">
                <span>{{ skill }}</span>
                <button @click="removeSkill(index)" class="text-red-500">삭제</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 분야별 모집 인원 -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">분야별 모집 인원</label>
          <div v-for="(position, index) in positions" :key="index" class="flex items-center space-x-2 mt-2">
            <select v-model="position.role" class="w-1/2 p-3 border border-gray-300 rounded-full">
              <option disabled value="">분야를 선택하세요</option>
              <option v-for="role in roleOptions" :key="role">{{ role }}</option>
            </select>

            <!-- 사람 수 조절 버튼 -->
            <div class="flex items-center space-x-1">
              <button type="button" @click="decreaseCount(index)" class="text-gray-500 px-2 rounded-full border border-gray-300">-</button>
              <span class="w-8 text-center">{{ position.count }}</span>
              <button type="button" @click="increaseCount(index)" class="text-gray-500 px-2 rounded-full border border-gray-300">+</button>
            </div>

            <!-- 삭제 버튼 -->
            <button type="button" @click="removePosition(index)" class="text-red-500 font-bold rounded-full">삭제</button>

            <!-- 마지막 칸에만 추가 버튼 표시 -->
            <button v-if="index === positions.length - 1" type="button" @click="addPosition" class="text-blue-500 font-bold rounded-full">추가</button>
          </div>
        </div>

        <!-- 프로젝트 소개 -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">프로젝트 소개</label>
          <textarea class="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" rows="5"></textarea>
        </div>

        <!-- 파일 첨부 -->
        <div class="p-6 text-center">
          <p class="text-gray-500">파일을 첨부하세요</p>
        </div>

        <!-- 등록 버튼 -->
        <div class="flex justify-end space-x-4 pt-4 border-t mt-6">
          <button type="button" class="px-6 py-2 border border-gray-400 text-gray-700 rounded-full hover:bg-gray-100">취소</button>
          <button type="submit" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-red-700">등록</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSkill: '',
      selectedSkills: [],
      techOptions: ['JAVA', 'Python', 'JavaScript', 'Spring', 'React', 'Node.js', 'Vue', 'Angular', 'Django', 'Kotlin'],
      positions: [{ role: '', count: 1 }], // 기본으로 한 칸이 미리 존재
      roleOptions: ['프론트엔드', '백엔드', '디자이너', 'PM', '기획자', '데브옵스', '안드로이드 개발자', 'IOS 개발자', '크로스 플랫폼 개발자']
    };
  },
  methods: {
    addSkill() {
      if (this.selectedSkill && !this.selectedSkills.includes(this.selectedSkill)) {
        this.selectedSkills.push(this.selectedSkill);
        this.selectedSkill = '';
      }
    },
    removeSkill(index) {
      this.selectedSkills.splice(index, 1);
    },
    addPosition() {
      this.positions.push({ role: '', count: 1 });
    },
    removePosition(index) {
      this.positions.splice(index, 1);
    },
    increaseCount(index) {
      this.positions[index].count += 1;
    },
    decreaseCount(index) {
      if (this.positions[index].count > 1) {
        this.positions[index].count -= 1;
      }
    }
  }
};
</script>

<style scoped>
.bg-primary {
  background-color: #d10000;
}
</style>
