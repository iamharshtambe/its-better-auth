import { Edit, Trash2, Plus } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from './supabase-client';

type Tasks = {
  id: number;
  title: string;
  description: string;
  created_at: string;
}[];

export default function App() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState<Tasks>([]);
  const [newDescription, setNewDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function handleSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();

    const { error } = await supabase.from('tasks').insert(newTask).single();

    if (error) {
      console.error('Error adding tasks:', error.message);
      return;
    }

    setNewTask({ title: '', description: '' });

    fetchTasks();
  }

  async function fetchTasks() {
    setIsLoading(true);

    const { error, data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error adding tasks:', error.message);
      return;
    }

    setTasks(data);

    setIsLoading(false);
  }

  async function deleteTask(id: number) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      console.error('Error deleting tasks:', error.message);
      return;
    }

    fetchTasks();
  }

  async function updateTask(id: number) {
    const { error } = await supabase
      .from('tasks')
      .update({ description: newDescription })
      .eq('id', id);

    if (error) {
      console.error('Error updating tasks:', error.message);
      return;
    }

    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-center mb-8">
          SupaTask
        </h1>

        {/* Add Task Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6 mb-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter Task"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 bg-gray-900/70 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-gray-900/70 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              />
            </div>

            <button
              onClick={() =>
                handleSubmit({
                  preventDefault: () => {},
                } as FormEvent<HTMLDivElement>)
              }
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks */}
        {isLoading ? (
          <p className="text-gray-300 text-center text-lg">Loading Tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">Add tasks...</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="my-4">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6 hover:bg-gray-800/70 transition-all duration-200">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {task.title}
                </h3>
                <p className="text-gray-300 mb-4">{task.description}</p>
                <div className="flex gap-2">
                  <textarea
                    placeholder="Updated description..."
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="bg-gray-900/70 text-white placeholder-gray-400 border border-gray-600 rounded-lg p-3 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none h-12"
                  />
                  <button
                    onClick={() => updateTask(task.id)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 min-w-max"
                  >
                    <Edit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 min-w-max"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
