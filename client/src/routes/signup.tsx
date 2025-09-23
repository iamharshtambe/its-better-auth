import { useState } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

    if (password !== confirmPassword) {
      setError('Password does not match')
      return
    }

    setLoading(true)

    try {
      await authClient.signUp.email({
        name,
        email,
        password,
      })

      router.navigate({
        to: '/todos',
      })
    } catch (err) {
      setError('An unexpected error occur')
      console.log('Error', err)
    } finally {
      setLoading(true)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-6 rounded-2xl shadow-md bg-base-100"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {error && <div>{error}</div>}

        {/* Name */}
        <div>
          <label className="input validator w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              minLength={2}
              disabled={loading}
            />
          </label>
          <div className="validator-hint hidden">Enter your name</div>
        </div>

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
              required
              minLength={6}
              disabled={loading}
            />
          </label>
          <div className="validator-hint hidden">
            Password must be at least 6 characters
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="input validator w-full">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              disabled={loading}
              required
            />
          </label>
          <div className="validator-hint hidden">Passwords must match</div>
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
              <span className="ml-2">Creating account...</span>
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        <div className="mt-6 text-center text-sm">
          <p className="text-base-content/70">
            Already have an account?{' '}
            <Link to="/signin" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
