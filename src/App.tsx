import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import { routes } from './routes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
