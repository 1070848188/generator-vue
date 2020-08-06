// 引入必要组件
import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'
const router = import('@/router')

// 配置axios相关属性
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Cache-Control'] = 'no-cache'
axios.defaults.headers.pragma = 'no-cache'

let source = axios.CancelToken.source()

let loading

function startLoading () { // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading () { // 使用Element loading-close 方法
  loading.close()
}

// 请求头中添加token
axios.interceptors.request.use(request => {
  startLoading()
  if (getToken()) {
    request.headers.Authorization = getToken()
  }
  return request
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response => {
    endLoading()
    const res = response.data
    const errMsg = res.message || res.msg || '请求失败'
    if (res.code !== 0) {
      Message({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === -2) {
        MessageBox.confirm('您的登录状态已经失效，请重新登录', '登录失效', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        //   router.then(lib => {
        //     if (lib.default.currentRoute.name === 'login') return
        //     lib.default.push({
        //       name: 'login'
        //     })
        //     Message.warning(res.state.msg)
        //   })
        })
      }
      return Promise.reject(new Error(errMsg))
    } else {
      return res
    }
  },
  error => {
    console.log('reject', { error })
    let errMsg = error.message || error.msg || '请求失败'
    if (error.response && error.response.data) {
      errMsg = error.response.data.msg
    }
    Message({
      message: errMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 切换页面取消请求
axios.interceptors.request.use(request => {
  endLoading()
  request.cancelToken = source.token
  return request
})

router.then(lib => {
  lib.default.beforeEach((to, from, next) => {
    source.cancel()
    source = axios.CancelToken.source()
    next()
  })
})

export function post (url, data, otherConfig) {
  return axios.post(url, data, otherConfig)
}

export function get (url, data, otherConfig) {
  return axios.get(url, {
    params: data,
    ...otherConfig
  })
}
