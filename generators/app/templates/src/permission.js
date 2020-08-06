import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // 开启进度条

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  document.title = '全面预算'

  const hasToken = getToken()

  // 用户是否登录
  if (hasToken) {
    if (to.path === '/login') { // 已经登录的用户无法进入登录页面
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else { // 用户未登录
    if (whiteList.includes(to.path)) { // 是否存在在白名单内
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
