import {createContext, lazy, type ComponentType, type LazyExoticComponent} from 'react'
import BaseApplicationLayout from '../appliactions/baseApplication'

export type BaseRouteItem = {
  /** 相对父应用的路径；空字符串表示 index */
  path: string
  label: string
  Component: LazyExoticComponent<ComponentType>
}

export type ApplicationItem = {
  id: string
  name: string
  /** URL 段，如 base -> /base/* */
  path: string
  Layout: ComponentType
  routes: BaseRouteItem[]
}

export type RouteConfigValue = {
  redirect: string
  applications: ApplicationItem[]
}

export function resolveApplicationByPathname(
  pathname: string,
  applications: ApplicationItem[],
): ApplicationItem | undefined {
  return (
    applications.find(
      (a) => pathname === `/${a.path}` || pathname.startsWith(`/${a.path}/`),
    ) ?? applications[0]
  )
}

// lazy(() => import('./某页')) 表示这个页面组件是按需加载的，第一次要渲染时才会去下对应的 JS 分包。
export const routeConfig: RouteConfigValue = {
  redirect: '/base/web-ar',
  applications: [
    {
      id: 'base',
      name: 'baseApplication',
      path: 'base',
      Layout: BaseApplicationLayout,
      routes: [
        {
          path: '',
          label: '首页',
          Component: lazy(() => import('../appliactions/baseApplication/pages/LabHome')),
        },
        {
          path: 'closure',
          label: '闭包测试',
          Component: lazy(() => import('../appliactions/baseApplication/pages/ClosureDemo')),
        },
        {
          path: 'dynamic-style',
          label: '动态 style 测试',
          Component: lazy(() => import('../appliactions/baseApplication/pages/DynamicStyleDemo')),
        },
        {
          path: 'web-ar',
          label: 'Web AR',
          Component: lazy(() => import('../appliactions/baseApplication/pages/WebAr')),
        },
      ],
    },
  ],
}

export const routeContext = createContext<RouteConfigValue>(routeConfig)
