import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BBS from '../components/BBS/BBS.vue'
import BBSRegister from '../components/BBS/BBSRegister.vue'
import BBSList from '../components/BBS/BBSList.vue'
import BBSView from '../components/BBS/BBSView.vue'
import BBSModify from '../components/BBS/BBSModify.vue'

import Member from '../components/Members/MemberView.vue'
import MemberRegister from '../components/Members/MemberRegister.vue'
import MemberList from '../components/Members/MemberList.vue'

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
