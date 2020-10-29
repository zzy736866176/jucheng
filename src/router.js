import Vue from 'vue'
import Router from 'vue-router'

import showsLibrary from '@/views/showsLibrary'
import Index from '@/views/Tabbar/Index'
import Film from '@/views/Tabbar/Film'
import Eticket from '@/views/Tabbar/Eticket'
import Center from '@/views/Tabbar/Center'
import Show from '@/views/Show'
import Ticket from '@/views/Ticket'
import HotsRecommend from '@/views/HotsRecommend'
import Search from '@/views/Search'
import SearchIndex from '@/views/SearchIndex'
import selectCity from '@/views/selectCity'
Vue.use(Router)

var router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '/show',
    component: Show,
    children: [{
      path: '/show/ticket/:id',
      component: Ticket
    },
    {
      path: '/show/showsLibrary/:id',
      component: showsLibrary
    },
    {
      path: '/show/showsLibrary',
      component: HotsRecommend
    }
    ]
  },
  {
    path: '*',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/film',
    component: Film
  },
  {
    path: '/eticket',
    component: Eticket
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/search',
    component: Search,
    children: [{
      path: '/search/index',
      component: SearchIndex
    },
    {
      path: '/search/selectCity',
      component: selectCity
    }
    ]
  }

  ]
})

export default router

function checkLocal () {
  if (localStorage.getItem('city_name') !== null) {
    return true
  } else {
    return false
  }
}
router.beforeEach((to, from, next) => {
  if (to.path === '/search/selectCity') {
    next()
  } else {
    if (!checkLocal()) {
      next('/search/selectCity')
    } else {
      next()
    }
  }
})
