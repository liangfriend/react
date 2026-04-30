import { useContext, useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { resolveApplicationByPathname, routeContext } from '../../contexts/baseContext'
import './baseApplication.css'

export default function BaseApplicationLayout() {
  const { applications } = useContext(routeContext)
  const { pathname } = useLocation()

  const menuItems = useMemo(() => {
    const app = resolveApplicationByPathname(pathname, applications)
    if (!app) return []
    const prefix = `/${app.path}`
    return app.routes.map((r) => ({
      to: r.path === '' ? prefix : `${prefix}/${r.path}`,
      end: r.path === '',
      label: r.label,
    }))
  }, [applications, pathname])

  return (
    <div className="base-app">
      <aside className="base-app__sidebar">
        <div className="base-app__brand">Base Lab</div>
        <nav className="base-app__nav">
          {menuItems.map(({ to, end, label }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="base-app__main">
        <div className="base-app__main-inner">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
