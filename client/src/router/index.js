import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Prospect from '@/components/Prospect'
import Prospects from '@/components/Prospects'
import NewProspect from '@/components/NewProspect'
import EditProspect from '@/components/EditProspect'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/prospects',
      name: 'Prospects',
      component: Prospects
    },
    {
      path: '/prospect/new',
      name: 'NewProspect',
      component: NewProspect
    },
    {
      path: '/prospect/:id',
      name: 'Prospect',
      component: Prospect
    },
    {
      path: '/prospect/edit/:id',
      name: 'EditProspect',
      component: EditProspect
    }
  ]
})
