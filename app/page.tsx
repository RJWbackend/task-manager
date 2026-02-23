"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [summary, setSummary] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (data) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!newTask) return;
    await supabase.from("tasks").insert([{ title: newTask }]);
    setNewTask("");
    fetchTasks();
  };

  // Toggle completed
  const toggleTask = async (id: string, completed: boolean) => {
    await supabase.from("tasks").update({ completed: !completed }).eq("id", id);
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  // Generate an AI-style task summary based on current tasks
  const generateSummary = () => {
    if (tasks.length === 0) {
      setSummary("No tasks yet!");
      return;
    }

    const taskList = tasks.map((t, index) => `${index + 1}. ${t.title}`).join("\n");

    setSummary(
      `You have ${tasks.length} tasks:\n\n${taskList}\n\nFocus on the most important ones first!`
    );
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <a href="/stats" className="text-blue-500 underline">
          Stats
        </a>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <button
        onClick={generateSummary}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Task Summary
      </button>

      {summary && (
        <p className="mb-4 p-2 bg-gray-100 rounded whitespace-pre-line">
          {summary}
        </p>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, task.completed)}
                className="mr-2"
              />
              {task.title}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}