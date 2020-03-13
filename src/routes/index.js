/**
 * Created by Wu Jian Ping on - 2017/09/06.
 */

import layouts from '../layouts'

export default [
  {
    path: '/',
    component: layouts.getDefaultLayout(),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('./home')
      },
      {
        name: 'app-1',
        path: '/app-1',
        component: () => import('./app-1')
      },
      {
        name: 'app-2',
        path: '/app-2',
        component: () => import('./app-2')
      }
    ]
  }
]
