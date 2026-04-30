import { useContext, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { resolveApplicationByPathname, routeContext } from '../../../contexts/baseContext'

export default function LabHome() {
  const { applications } = useContext(routeContext)
  const { pathname } = useLocation()

  const links = useMemo(() => {
    const app = resolveApplicationByPathname(pathname, applications)
    if (!app) return []
    const prefix = `/${app.path}`
    return app.routes
      .filter((r) => r.path !== '')
      .map((r) => ({
        to: `${prefix}/${r.path}`,
        label: r.label,
      }))
  }, [applications, pathname])

  return (
    <>
      <h1 className="base-page-title">Base Lab</h1>
      <p className="base-page-desc">
        左侧菜单进入各小节；此处为默认首页，适合放实验说明或索引。
      </p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} style={{ color: '#7eb8ff' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
