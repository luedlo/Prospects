import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Prospect from '@/components/Prospect'
import Prospects from '@/components/Prospects'
import ProspectsEvaluate from '@/components/ProspectsEvaluate'
import NewProspect from '@/components/NewProspect'
import EditProspect from '@/components/EditProspect'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'current-link',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/acercade',
      name: 'About',
      component: About
    },
    {
      path: '/promotor',
      name: 'Prospects',
      component: Prospects
    },
    {
      path: '/evaluador',
      name: 'ProspectsEvaluate',
      component: ProspectsEvaluate
    },
    {
      path: '/prospecto/nuevo',
      name: 'NewProspect',
      component: NewProspect
    },
    {
      path: '/prospecto/:id',
      name: 'Prospect',
      component: Prospect
    },
    {
      path: '/prospecto/evaluar/:id',
      name: 'EditProspect',
      component: EditProspect
    }
  ]
})
