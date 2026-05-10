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
        {
          path: 'updateDom',
          label: '深层对象更新',
          Component: lazy(() => import('../appliactions/baseApplication/pages/UpdateDomTest.tsx')),
        },
        {
          path: 'listSearch',
          label: '超大列表搜索',
          Component: lazy(() => import('../appliactions/baseApplication/pages/ListSearchTest.tsx')),
        },
        {
          path: 'taskManage',
          label: '多重任务优先级管理',
          Component: lazy(() => import('../appliactions/baseApplication/pages/TaskManageTest.tsx')),
        },
        {
          path: 'hugeStateManage',
          label: '复杂状态管理',
          Component: lazy(() => import('../appliactions/baseApplication/pages/HugeStateManageTest.tsx')),
        },
        {
          path: 'useDeferredValue',
          label: 'useDeferredValue',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/UseDeferredValueTest.tsx')),
        },
        {
          path: 'useActionState',
          label: 'useActionState',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/UseActionStateTest.tsx')),
        },
        {
          path: 'useDebugValue',
          label: 'useDebugValue',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/UseDebugValueTest.tsx')),
        },
        {
          path: 'useEffectEvent',
          label: 'useEffectEvent',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/useEffectEventTest.tsx')),
        },
        {
          path: 'useImperativeHandle',
          label: 'useImperativeHandle',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/useImperativeHandleTest.tsx')),
        },
        {
          path: 'useOptimistic',
          label: 'useOptimistic',

          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/useOptimisticTest.tsx')),
        },
        {
          path: 'useSyncExternalStore',
          label: 'useSyncExternalStore',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/useSyncExternalStoreTest.tsx')),
        },
        {
          path: 'useTransition',
          label: 'useTransition',
          Component: lazy(() => import('../appliactions/baseApplication/pages/hookTest/useTransitionTest.tsx')),
        },
      ],
    },
  ],
}

export const routeContext = createContext<RouteConfigValue>(routeConfig)
