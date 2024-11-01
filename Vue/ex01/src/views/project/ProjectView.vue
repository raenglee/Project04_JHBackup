<template>
  <div class="w-4/6 mx-auto my-10">
    <!--🟥메인 박스-->
    <section class="container mx-auto">
      <div class="justify-center items-center text-center space-y-3">
        <p class="border border-[#d10000] rounded-full w-16 text-center m-auto">모집중</p>
        <h1 class="text-center font-bold text-2xl">제목이들어가는공간</h1>
        <div class="flex space-x-2 items-center justify-center">
          <img src="/img/people.png" class="w-8 h-8" />
          <p>닉네임</p>
        </div>
      </div>
      <div class="my-3 mb-8">
        <hr class="border-t-4 border-[#d10000]" />
      </div>

      <!--간단한 소개 박스-->
      <div class="flex justify-between space-x-10">
        <!--지역, 진행기간, 기술 / 언어 flex-col-->
        <div class="flex flex-col space-y-20">
          <div class="flex items-center">
            <p class="font-bold pr-2 text-lg">지역 / 구분</p>
            <p>대구</p>
          </div>
          <div class="flex items-center">
            <p class="font-bold pr-2 text-lg">진행 기간</p>
            <p>미정</p>
          </div>
          <div class="flex items-center">
            <p class="font-bold pr-2 text-lg">기술 / 언어</p>
            <p>어쩌구</p>
          </div>
        </div>
        <!--모집마감일-->
        <div>
          <p class="font-bold pr-2 text-lg">모집마감일</p>
          <p>yyyy.mm.dd</p>
        </div>
        <!--⭕모집 현황-->
        <div class="space-y-4">
          <p class="font-bold pr-2 text-lg">모집 현황</p>
          <div class="flex space-x-10">
            <p>디자이너</p>
            <p>2/3</p>
            <button class="border border-gray-200 rounded-full pl-2 pr-2 text-base hover:bg-gray-200">지원</button>
          </div>
          <div class="flex space-x-10">
            <p>디자이너</p>
            <p>2/3</p>
            <button class="border border-[#d10000] bg-[#d10000] text-white rounded-full pl-2 pr-2 text-base">마감</button>
          </div>
        </div>
      </div>

      <h1 class="pt-10 font-bold text-xl">프로젝트 소개</h1>
      <div class="my-3 mb-5">
        <hr class="border-t-4 border-[#d10000]" />
      </div>
      <p>내용들ㅁㄴㄹㄴㅇㄹㅇㅎㅇㅎㄹㅇㅇㅎㄴㄱㄷㅎㅇㄹㅀㅇㅎㄹㅇㄾㅀ</p>
      <div class="my-3 mb-5">
        <hr class="border-t-4 border-gray-200" />
      </div>

      <!--목록, 수정 버튼-->
      <div class="flex justify-between mb-10">
        <button class="border border-gray-200 rounded-full pl-2 pr-2 text-base hover:bg-gray-200">목록</button>
        <button class="border border-gray-200 rounded-full pl-2 pr-2 text-base hover:bg-[#d10000] hover:text-white hover:border-[#d10000]">수정</button>
      </div>

      <!--댓글 창-->
      <div class="flex flex-col w-3/6 m-auto justify-center items-center">
        <div class="flex items-center space-x-2">
          <img src="/img/people.png" class="w-8 h-8" />
          <p>닉네임</p>
        </div>
        <div class="flex">
          <div>
            <textarea v-model="content" class="w-96 p-3 mb-2 h-14 border border-gray-200 rounded-md focus:outline-none focus:ring-2 ring-gray-200 resize-none bg-gray-100"></textarea>
          </div>
          <button class="border border-gray-200 rounded-md pl-2 pr-2 text-base hover:bg-gray-200">등록</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
