import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="max-w-2xl mx-auto text-center pt-50 text-5xl tracking-tight text-neutral-500">
      Hello! <br />
      <p>This project is made using Hono, React and Better-Auth</p>
      <p className="font-medium text-lg tracking-normal pt-10">
        It is a simple demonstration of Authentication which is powered by
        Better-Auth
      </p>
    </div>
  )
}
