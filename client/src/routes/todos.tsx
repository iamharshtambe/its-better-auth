import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'
import type { AppType } from '../../../server'

const client = hc<AppType>('/')

export const Route = createFileRoute('/todos')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.api.todos.$get()
      if (!res.ok) throw new Error('Failed to fetch todos')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600 animate-pulse">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          Loading todos...
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-700 bg-gray-200 p-6 rounded-lg shadow-sm border border-gray-300">
          <div className="text-gray-500 mb-2">⚠️</div>
          Error: {error.message}
        </div>
      </div>
    )
  }

  if (isSuccess && (!data || data.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600 bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="text-4xl text-gray-400 mb-4">📝</div>
          No todos found.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">
          My Todos
        </h1>
        <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
          <ul className="space-y-3">
            {data &&
              data.map((todo: any) => (
                <li
                  key={todo.id}
                  className="p-4 bg-gray-200 shadow-sm rounded-lg flex items-center justify-between hover:bg-gray-300 transition-all duration-200 border border-gray-300"
                >
                  <span
                    className={
                      todo.completed
                        ? 'line-through text-gray-500 font-medium'
                        : 'text-gray-800 font-medium'
                    }
                  >
                    {todo.title}
                  </span>
                  {todo.completed && (
                    <span className="text-gray-600 font-semibold bg-gray-300 px-3 py-1 rounded-full text-sm border border-gray-400">
                      Done
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
