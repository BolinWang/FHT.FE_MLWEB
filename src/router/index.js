import Vue from 'vue'
import Router from 'vue-router'
import routes from './routesList'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const cityName = store.state.user.cityInfo.name || '杭州'
  /* 路由发生变化修改页面title */
  document.title = to.meta.title.replace(/{城市名}/gi, cityName)
  to.meta.metaList.forEach(item => {
    document.querySelector(`meta[name="${item.name}"]`).content = item.content.replace(/{城市名}/gi, cityName)
  })
  next()
})

// router.afterEach((to, from) => {
//   window.scrollTo(0, 0)
// })

export default router
