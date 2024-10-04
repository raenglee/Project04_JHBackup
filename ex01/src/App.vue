<template>
  <header>
    <h1 class="text-5xl"></h1>
    <div class="p-5 bg-black text-white text-3xl">
      <nav class="flex space-x-5">
        <div>
          <RouterLink to="/">Home</RouterLink>
        </div>
        <div>
          <RouterLink to="/userlist">User</RouterLink>
        </div>

        <div class="group relative">
          <RouterLink to="/freeboardlist">FreeBoard</RouterLink>
          <div
            class="opacity-0 group-hover:opacity-100 transition absolute bg-violet-500 p-5 top-8 -left-5 rounded"
          >
            <div>
              <RouterLink to="/freeboardlist">FreeBoardList</RouterLink>
            </div>
            <div>
              <RouterLink to="/freeboardinput">FreeBoardinput</RouterLink>
            </div>
          </div>
        </div>
        <div>
          <button
            class="text-base mt-1 px-2 py-1 bg-gray-500 text-white font-semibold rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-white"
            @click.stop="modalLogin('login')"
          >
            로그인
          </button>
        </div>
      </nav>

      <div class="overlay" :class="{ isModal: isModal }"></div>
      <div class="modal p-5 rounded" :class="{ isView: isModal }">
        <button class="text-base px-1 py-1 text-black font-semibold hover:text-gray-500 focus:outline-none"
    @click="modalLogin">X</button>
    <h1 class="text-black text-center">로그인 하세요 ~</h1>    
    <div class="flex space-x-5 justify-center">
          
          <div class="cursor-pointer p-5 m-5 w-80 text-black rounded">
            <button class="m-5"><img src="../img/kakao.png" width="50"></button>
            <button class="m-5"><img src="../img/naver.png" width="50"></button>
            <button class="m-5"><img src="../img/google.png" width="50"></button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <RouterView/>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isModal = ref(false)

const modalLogin = async (item) => {
  isModal.value = !isModal.value
  if (item == 'login') {
    await saveUser({
      id: 'test',
      password: '1234'
    })
    alert('로그인 성공')
    return
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgb(0, 0, 0, 0.3);
  display: none;
}
.isModal {
  display: block;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1001;
  display: none;
}
.isView {
  display: block;
}
</style>
