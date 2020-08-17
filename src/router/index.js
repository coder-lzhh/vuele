import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const goods = () => import('components/goods.vue')
const ratings = () => import('components/ratings.vue')
const seller = () => import('components/seller.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'goods',
    component: goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
