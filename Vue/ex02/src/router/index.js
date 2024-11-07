import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from '@/views/project/ProjectList.vue';
import ProjectCreate from '@/views/project/ProjectCreate.vue';
import ProjectView from '@/views/project/ProjectView.vue';

import Profile from '@/views/auth/Profile.vue';

import MyPage from '@/views/mypage/MyPage.vue';
import MyProfile from '@/views/mypage/MyProfile.vue';
import MyProfileEdit from '@/views/mypage/MyProfileEdit.vue';
import MyComment from '@/views/mypage/MyComment.vue';
import MyLikePost from '@/views/mypage/MyLikePost.vue';

import ProjectManagement from '@/views/projectmanagement/ProjectManagement.vue';
import MyProject from '@/views/projectmanagement/MyProject.vue';
import Projectapproval from '@/views/projectmanagement/ProjectApproval.vue';

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
          path: 'myprofile',
          name: 'myprofile',
          component: MyProfile
        },
        {
          path: 'mycomments',
          name: 'mycomments',
          component: MyComment
        },
        {
          path: 'mylikeposts',
          name: 'mylikeposts',
          component: MyLikePost
        },
        {
          path: 'myprofileedit',
          name: 'myprofileedit',
          component: MyProfileEdit
        },
        {
          path: '', // 기본 경로: /mypage
          name: 'default', // 이름 추가
          redirect: 'myprofile' // 기본페이지 myprofile로 리디렉션
        }
      ]
    },
    {
      path: '/projectcreate',
      name: 'projectcreate',
      component: ProjectCreate
    },
    {
      path: '/projectview/:board_id',
      name: 'projectview',
      component: ProjectView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/projectmanagement',
      name: 'projectmanagement',
      component: ProjectManagement,
      children: [
        {
          path: 'myproject',
          name: 'myproject',
          component: MyProject
        },
        {
          path: 'projectapproval',
          name: 'projectapproval',
          component: Projectapproval
        },
        {
          path: '',
          name: 'default',
          redirect: 'myproject'
        }
      ]
    }
  ]
});

export default router;
