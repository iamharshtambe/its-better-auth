import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form className="w-full max-w-sm space-y-4 p-6 rounded-2xl shadow-md bg-base-100">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {/* Name */}
        <div>
          <label className="input validator w-full">
            <input type="text" placeholder="Full Name" required minLength={2} />
          </label>
          <div className="validator-hint hidden">Enter your name</div>
        </div>

        {/* Email */}
        <div>
          <label className="input validator w-full">
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>

        {/* Password */}
        <div>
          <label className="input validator w-full">
            <input
              type="password"
              placeholder="Password"
              required
              minLength={6}
            />
          </label>
          <div className="validator-hint hidden">
            Password must be at least 6 characters
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="input validator w-full">
            <input type="password" placeholder="Confirm Password" required />
          </label>
          <div className="validator-hint hidden">Passwords must match</div>
        </div>

        {/* Submit */}
        <button className="btn btn-neutral w-full" type="submit">
          Create Account
        </button>
      </form>
    </div>
  )
}
