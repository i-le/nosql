
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/auth', component: () => import('pages/Auth.vue')},
      { path: '/edit', component: () => import('pages/Edit.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
