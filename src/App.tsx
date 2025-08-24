import { Edit, Trash2, Plus } from 'lucide-react';
import { useState, type FormEvent } from 'react';

export default function App() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl text-white font-bold text-center mb-8">
          SupaTask
        </h1>

        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter Task"
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter Description"
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2">
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </form>

        {/* Sample Tasks */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Team meeting preparation
            </h3>
            <p className="text-gray-600 mb-4">
              Prepare agenda and slides for the weekly team standup meeting
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                <Edit size={18} />
                Edit Task
              </button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                <Trash2 size={18} />
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
