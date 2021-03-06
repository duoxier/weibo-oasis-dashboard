import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'index',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  },
  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/nearby',
    name: 'Tools',
    meta: { title: '绿洲测试工具', icon: 'tools' },
    children: [
      {
        path: 'nearby',
        name: 'Nearby',
        component: () => import('@/views/tools/nearby'),
        meta: { title: '同城', icon: 'el-icon-place' },
        children: [
          {
            path: 'clear-viewer',
            component: () => import('@/views/tools/nearby/clear-viewer/index'),
            name: 'Clear-viewer',
            meta: { title: '清除位置信息' }
          },
          {
            path: 'dispatch',
            component: () => import('@/views/tools/nearby/dispatch/index'),
            name: 'Dispatch',
            meta: { title: '下发物料' }
          },
          {
            path: 'status',
            component: () => import('@/views/tools/nearby/status/index'),
            name: 'Status',
            meta: { title: '同城动态质量分查询' }
          },
          {
            path: 'weibo-position',
            component: () => import('@/views/tools/nearby/weibo-position/index'),
            name: 'Weibo-position',
            meta: { title: '微博常用位置查询' }
          }
        ]
      },

      {
        path: 'likes',
        name: 'Likes',
        component: () => import('@/views/tools/likes'),
        meta: { title: '点赞', icon: 'like' },
        children: [
          {
            path: 'like',
            component: () => import('@/views/tools/likes/like/index'),
            name: 'like',
            meta: { title: '点赞' }
          },
          {
            path: 'unlike',
            component: () => import('@/views/tools/likes/unlike/index'),
            name: 'unlike',
            meta: { title: '取消点赞' }
          }
        ]
      },

      {
        path: 'friends',
        name: 'Friends',
        component: () => import('@/views/tools/follows'),
        meta: { title: '关注', icon: 'follow' },
        children: [
          {
            path: 'follow',
            component: () => import('@/views/tools/follows/follow/index'),
            name: 'follow',
            meta: { title: '关注' }
          },
          {
            path: 'unfollow',
            component: () => import('@/views/tools/follows/unfollow/index'),
            name: 'unfollow',
            meta: { title: '取消关注' }
          }
        ]
      },
      {
        path: 'water',
        name: 'Water',
        component: () => import('@/views/tools/water'),
        meta: { title: '水滴', icon: 'water' },
        children: [
          {
            path: 'charge',
            component: () => import('@/views/tools/water/charge/index'),
            name: 'charge',
            meta: { title: '水滴充值' }
          },
          {
            path: 'gather',
            component: () => import('@/views/tools/water/gather/index'),
            name: 'gather',
            meta: { title: '水滴收取' }
          }
        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
