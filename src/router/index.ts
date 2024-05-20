import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/near-earth-objects',
      name: 'nearEarthObjects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NearEarthObjects.vue')
    },
    {
      path: '/mars-rovers',
      name: 'marsRovers',
      component: () => import('../views/MarsRovers.vue')
    },
    {
      path: '/mars-rovers/:roverName',
      name: 'roverDetail',
      component: () => import('../views/MarsRoverDetail.vue'),
      props: true
    }
  ]
})

export default router
