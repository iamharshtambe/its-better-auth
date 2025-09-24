import { Link } from '@tanstack/react-router'
import { LogIn, LogOut, ShieldAlert } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default function Header() {
  const { data: session } = authClient.useSession()

  async function handleLogOut() {
    await authClient.signOut()
  }

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <h1 className="text-3xl font-bold">Todos</h1>

      <ul className="flex items-center justify-between gap-4 text-lg text-neutral-500">
        <Link to="/" activeProps={{ className: 'font-bold' }}>
          <li className="hover:border px-1 hover:rounded-2xl hover:bg-neutral-200">
            Home
          </li>
        </Link>

        <Link
          to="/todos"
          activeProps={{ className: 'font-bold' }}
          disabled={!session}
        >
          <li className="hover:border px-1 hover:rounded-2xl hover:bg-neutral-200">
            Todos
          </li>
        </Link>

        {!session && (
          <div
            className="tooltip tooltip-bottom"
            data-tip="Must be signed in to access"
          >
            <ShieldAlert />
          </div>
        )}

        {session ? (
          <button
            onClick={handleLogOut}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <LogOut />
          </button>
        ) : (
          <Link to="/signin" className="flex items-center link link-primary">
            <LogIn />
          </Link>
        )}
      </ul>
    </nav>
  )
}
