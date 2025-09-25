import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'
export const Route = createFileRoute('/_products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <Outlet />
  </>
}
