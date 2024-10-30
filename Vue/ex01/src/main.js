import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

//폰트어썸
import { FontAwesomeIcon } from '@/assets/FontAwesome'; //폰트 어썸 전역 등록
import SvgIcon from '@/assets/SvgIcon.vue'; //SvgIcon 전역 등록
//import "quill/dist/quill.snow.css"; // Quill 에디터 스타일 추가

const app = createApp(App);

// pinia 설정
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon); // 컴포넌트 전역등록
app.component('SvgIcon', SvgIcon);

app.use(router);
app.mount('#app');
