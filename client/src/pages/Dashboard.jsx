import React from "react";
import TaskForm from "../components/TaskForm"; // Import TaskForm
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "../utils/queries"; // Query to fetch tasks
import { ADD_TASK } from "../utils/mutations"; // Mutation to add tasks

const Dashboard = () => {
  // Query to fetch tasks
  const { loading, error, data, refetch } = useQuery(GET_TASKS);

  // Mutation to add a task
  const [addTask] = useMutation(ADD_TASK);

  // Function to handle saving a task
  const handleSaveTask = async (taskData) => {
    try {
      const { data } = await addTask({
        variables: {
          title: taskData.title,
          description: taskData.description || "",
          status: taskData.status || "To Do",
          dueDate: taskData.dueDate || null,
        },
      });
      console.log("Task added successfully:", data.addTask);
      refetch(); // Refresh the task list after adding a task
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Display loading or error states
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  // Render the task list
  const tasks = data.tasks;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <TaskForm handleSaveTask={handleSaveTask} /> {/* Pass handleSaveTask as a prop */}
      <h3>Your Tasks</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate || "No due date"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;