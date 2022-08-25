import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BBS from '../views/bbs/BBS.vue'
import BBSRegister from '../views/bbs/BBSRegister.vue'
import BBSList from '../views/bbs/BBSList.vue'
import BBSView from '../views/bbs/BBSView.vue'
import BBSModify from '../views/bbs/BBSModify.vue'

import Member from '../views/member/MemberView.vue'
import MemberRegister from '../views/member/MemberRegister.vue'
import MemberList from '../views/member/MemberList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bbs',
      name: 'bbs',
      component: BBS,
      children: [
        {
          path: 'register',
          name: 'nns-register',
          component: BBSRegister
        },
        {
          path: 'list',
          name: 'bbs-list',
          component: BBSList
        },
        {
          path: 'view/:id',
          name: 'bbs-view',
          component: BBSView
        },
        {
          path: 'modify/:id',
          name: 'bbs-modify',
          component: BBSModify
        },
      ]
    },
    {
      path: '/member',
      name: 'members',
      component: Member,
      children: [
        {
          path: 'register',
          name: 'member-register',
          component: MemberRegister
        },
        {
          path: 'list',
          name: 'member-list',
          component: MemberList
        }
      ]
    },
  ]
})

export default router
