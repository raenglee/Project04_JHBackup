<template>
  <div class="pt-7 px-2">
    <div class="flex flex-col gap-2">

      <div class="flex justify-between">
      <button type="button" class="border border-gray-400 w-12 rounded-full text-sm">전체</button>
      <button type="button" class="border border-gray-400 w-12 rounded-full text-sm">삭제</button>
    </div>

    
      <p class="text-sm">YYYY-MM-DD</p>
      <div class="flex justify-between items-center text-center">
        <div class="flex gap-3">
          <p class="border border-gray-200 rounded-full bg-gray-200 text-sm px-2">서울</p>
          <p class="m-auto">제목</p>
          <p class="text-sm font-bold text-[#d10000] m-auto">[댓글수]</p>
        </div>
        <div class="flex gap-3 text-sm">
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </div>
      </div>
      <hr class="border-t border-gray-300 mt-2" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
