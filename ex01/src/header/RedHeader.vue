<template>
  <div>
    <header>
      <h1 class="text-5xl"></h1>
      <div class="p-5 bg-[#d10000] text-white text-3xl">
        <nav class="flex space-x-5">
          <div>
            <RouterLink to="/">DEVMIX</RouterLink>
          </div>
          <div>
            <RouterLink to="/mypage">마이페이지</RouterLink>
          </div>

          <div class="group relative">
            <RouterLink to="/projectlist">프로젝트</RouterLink>
            <div
              class="opacity-0 group-hover:opacity-100 transition absolute bg-[#7371fc] p-5 top-8 -left-5 rounded"
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
              class="text-base px-2 py-1 bg-[#7371fc] text-white font-semibold hover:bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-white"
              @click.stop="modalLogin('login')"
            >
              로그인
            </button>
          </div>
        </nav>

        <div class="overlay" :class="{ isModal: isModal }"></div>
        <div class="modal p-5 w-80 rounded-lg" :class="{ isView: isModal }">
          <div>
            <h1 class="text-black text-center p-5">로그인</h1>
            <button class="text-black font-semibold hover:text-gray-500" @click="modalLogin">
              X
            </button>
          </div>

          <div class="ustify-center">
            <div>
              <button class="m-2"><img src="/img/sns_G.png" /></button>
              <button class="m-2"><img src="/img/sns_n.png" /></button>
              <button class="m-2"><img src="/img/sns_k.png" /></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isModal = ref(false)

const modalLogin = async () => {
  isModal.value = !isModal.value
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
