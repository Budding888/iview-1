import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import TheLayout from '@/components/layout'
import Root from '@/views/root'
import notFound from './routes/not-found'
import home from './routes/home'
import login from './routes/login'
import logout from './routes/logout'
import iView from 'iview'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/',
          component: TheLayout,
          children: [
            home
          ],
          meta: {
            requiresAuth: true
          }
        },
        login,
        logout,
        notFound
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

export default router
