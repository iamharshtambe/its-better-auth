import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <h1 className="text-3xl font-bold">Todos</h1>

      <ul className="flex items-center justify-between gap-4 text-lg text-neutral-500">
        <Link to="/" activeProps={{ className: 'font-bold' }}>
          <li className="hover:border px-1 hover:rounded-2xl hover:bg-neutral-200">
            Home
          </li>
        </Link>

        <Link to="/todos" activeProps={{ className: 'font-bold' }}>
          <li className="hover:border px-1 hover:rounded-2xl hover:bg-neutral-200">
            Todos
          </li>
        </Link>
      </ul>
    </nav>
  )
}
