import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from '@/views/project/ProjectList.vue';
import ProjectCreate from '@/views/project/ProjectCreate.vue';
import MyPage from '@/views/mypage/MyPage.vue';
import SignUp from '@/views/auth/signUp.vue';
import MyPost from '@/views/mypage/MyPost.vue';
import MyComment from '@/views/mypage/MyComment.vue';
import MyProject from '@/views/mypage/MyProject.vue';
import MyLikePost from '@/views/mypage/MyLikePost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'projectlist',
      component: ProjectList
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
      children: [
        {
          path: 'myposts',
          name: 'myposts',
          component: MyPost
        },
        {
          path: 'mycomments',
          name: 'mycomments',
          component: MyComment
        },
        {
          path: 'myprojects',
          name: 'myprojects',
          component: MyProject
        },
        {
          path: 'mylikeposts',
          name: 'mylikeposts',
          component: MyLikePost
        },
        {
          path: '', // 기본 경로: /mypage
          name: 'default', // 이름 추가
          redirect: 'myposts' // 기본적으로 myposts로 리디렉션
        }
      ]
    },
    {
      path: '/projectcreate',
      name: 'projectcreate',
      component: ProjectCreate
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
});

export default router;
