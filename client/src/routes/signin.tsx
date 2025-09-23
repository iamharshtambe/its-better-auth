import { useState } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { data: session } = authClient.useSession()

  if (session) {
    router.navigate({
      to: '/todos',
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    setLoading(true)
    try {
      await authClient.signIn.email({
        email,
        password,
      })

      router.navigate({
        to: '/todos',
      })
    } catch (err) {
      setError('Invalid email or password')
      console.log('Error', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-6 rounded-2xl shadow-md bg-base-100"
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {error && <div className="text-error text-sm">{error}</div>}

        {/* Email */}
        <div>
          <label className="input validator w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@site.com"
              disabled={loading}
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>

        {/* Password */}
        <div>
          <label className="input validator w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
              required
              minLength={6}
            />
          </label>
          <div className="validator-hint hidden">
            Password must be at least 6 characters
          </div>
        </div>

        {/* Submit */}
        <button
          className="btn btn-neutral w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="ml-2">Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="mt-6 text-center text-sm">
          <p className="text-base-content/70">
            Don't have an account?{' '}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
