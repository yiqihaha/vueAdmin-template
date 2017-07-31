import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const AuthRedirect = _import('login/authredirect');

/* dashboard */
const Dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/* demo page */
const Form = _import('page/form');
const Tree = _import('auth/menuTree')
const Table = _import('table/index');
const ExampleTable = _import('example/table/table');

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/authredirect', component: AuthRedirect, hidden: true },
  { path: '/404', component:  Err404, hidden: true },
     { path: '/401', component: Err401, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: Dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    id: 1,
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '系统设置',
    icon: 'zujian',
    children: [
      { id: 100, path: 'index', component: Form, name: 'Form', icon: 'zonghe' },
        { id: 101, path: 'tree', component: Tree, name: '权限设置', icon: 'zonghe' }
    ]
  },

  {
    id: 2,
    path: '/table',
    component: Layout,
    redirect: 'noredirect',
    name: 'Table',
    icon: 'tubiaoleixingzhengchang',
    // noDropdown: true,
    children: [
        { id: 200, path: 'index', component: Table, name: 'SimpleTable' },
        { id: 201, path: 'table', component: ExampleTable, name: '综合table', icon: 'zonghe' }
        ]
  },

  { path: '*', redirect: '/404', hidden: true }
];
