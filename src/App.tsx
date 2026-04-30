import {Suspense, useContext} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {routeContext} from './contexts/baseContext'

function RouteFallback() {
  return <div className="route-fallback">加载中…</div>
}

export default function App() {
  const {redirect, applications} = useContext(routeContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={redirect} replace/>}/>
        {applications.map((app) => {
          const {Layout, path: appPath, routes, id} = app
          return (
            <Route key={id} path={appPath} element={<Layout/>}>
              {routes.map((r) => {
                const {path: childPath, Component} = r
                const key = childPath === '' ? `${id}-index` : `${id}-${childPath}`
                const page = (
                  //  Suspense是 React 提供的边界组件，用来声明：它包住的那棵子树里，如果有东西「还没准备好」，就先显示 fallback
                  // lazy 组件必须包在 Suspense 里
                  <Suspense fallback={<RouteFallback/>}>
                    <Component/>
                  </Suspense>
                )
                if (childPath === '') {
                  return <Route key={key} index element={page}/>
                }
                return <Route key={key} path={childPath} element={page}/>
              })}
            </Route>
          )
        })}
        <Route path="*" element={<Navigate to={redirect} replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}
