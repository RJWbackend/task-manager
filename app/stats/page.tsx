"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Stats() {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    const { data } = await supabase.from("tasks").select("*");
    if (data) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const open = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Stats</h1>
      <p>Total tasks: {total}</p>
      <p>Completed: {completed}</p>
      <p>Open: {open}</p>

      <div className="w-full bg-gray-300 rounded-full h-6 mt-2 relative">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 text-white font-bold">
          {progress}%
        </span>
      </div>
    </div>
  );
}