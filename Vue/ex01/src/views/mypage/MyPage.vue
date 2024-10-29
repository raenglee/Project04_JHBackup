<template>
  <div class="flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow-lg min-height-80">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-5xl my-10">마이페이지</h1>
      <h1>닉네임: {{ useStore.nickname }}</h1>
      <h1>username: {{ useStore.username }}</h1>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';

const useStore = useUserStore;

console.log('username in localStorage:', localStorage.getItem('username'));
</script>

<style lang="scss" scoped></style>
