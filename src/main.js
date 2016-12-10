import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 0. 如果使用模块化机制编程， 要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来

import Index from './view/Index'
import Search from './view/search'
import searchResult from './view/searchResult'
import secondIndex from './view/secondIndex'
import User from './view/user'
import review from './view/review'
import Detail from './view/detail'
import MyOrder from './view/myOrder'
import MyPeople from './view/myPeople'
import PeopleEdit from './view/peopleEdit'
import UserEdit from './view/userEdit'
import TripEdit from './view/tripEdit'
import Feedback from './view/feedback'
import MyCollection from './view/myCollection'
import TakeOrder from './view/takeOrder'


const FastClick = require('fastclick')
FastClick.attach(document.body)

import store from './vuex/store'

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
// const Detail = resolve => require(['./view/detail'], resolve)
const routes = [
  { path: '/', component: Index },
  { path: '/Search', component: Search },
  { path: '/searchResult', component: searchResult },
  { path: '/secondIndex', component: secondIndex },
  { path: '/user', component: User },
  { path: '/review', component: review },
  { path: '/detail', component: Detail },
  { path: '/MyOrder', component: MyOrder },
  { path: '/MyPeople', component: MyPeople },
  { path: '/PeopleEdit', component: PeopleEdit },
  { path: '/UserEdit', component: UserEdit },
  { path: '/TripEdit', component: TripEdit },
  { path: '/Feedback', component: Feedback },
  { path: '/MyCollection', component: MyCollection },
  { path: '/TakeOrder', component: TakeOrder }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  // base: '/lehai',
  mode: 'history',

  routes, // （缩写）相当于 routes: routes
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


router.beforeEach((to, from, next) => {
  store.state.isLoading = true
  setTimeout(next, 50)
})
router.afterEach((to, from) => {
  store.state.isLoading = false
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})

export default router
