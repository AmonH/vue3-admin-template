//系统总览
const dashboard = () => import('@/views/analysis/dashboard/dashboard.vue'); //商品统计
const overview = () => import('@/views/analysis/overview/overview.vue'); //核心技术

//系统管理
const user = () => import('@/views/system/user/user.vue'); //用户管理
const department = () => import('@/views/system/department/department.vue'); //部门管理
const menu = () => import('@/views/system/menu/menu.vue'); //菜单管理
const role = () => import('@/views/system/role/role.vue');

//商品中心
const category = () => import('@/views/product/category/category.vue'); //商品类别
const goods = () => import('@/views/product/goods/goods.vue'); //商品信息

//随便聊聊
const chat = () => import('@/views/story/chat/chat.vue'); //你的故事
const list = () => import('@/views/story/list/list.vue'); //故事列表

const asyncRoutes = [
  {
    path: '/analysis/dashboard',
    name: 'Dashboard',
    component: dashboard,
    meta: {
      title: '商品统计'
    },
    children: []
  },
  {
    path: '/analysis/overview',
    name: 'Overview',
    component: overview,
    meta: {
      title: '核心技术'
    },
    children: []
  },
  {
    path: '/system/user',
    name: 'User',
    component: user,
    meta: {
      title: '用户管理'
    },
    children: []
  },
  {
    path: '/system/department',
    name: 'Department',
    component: department,
    meta: {
      title: '部门管理'
    },
    children: []
  },
  {
    path: '/system/menu',
    name: 'Menus',
    component: menu,
    meta: {
      title: '菜单管理'
    },
    children: []
  },
  {
    path: '/system/role',
    name: 'Role',
    component: role,
    meta: {
      title: '角色管理'
    },
    children: []
  },
  {
    path: '/product/category',
    name: 'Category',
    component: category,
    meta: {
      title: '商品类型'
    },
    children: []
  },
  {
    path: '/product/goods',
    name: 'Goods',
    component: goods,
    meta: {
      title: '商品信息'
    },
    children: []
  },
  {
    path: '/story/chat',
    name: 'Chat',
    component: chat,
    meta: {
      title: '你的故事'
    },
    children: []
  },
  {
    path: '/story/list',
    name: 'List',
    component: list,
    meta: {
      title: '故事列表'
    },
    children: []
  }
];

export default asyncRoutes;
