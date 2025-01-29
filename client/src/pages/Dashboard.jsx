import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "../utils/queries";
import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../utils/mutations";

const Dashboard = () => {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [editingTask, setEditingTask] = useState(null);

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const { data } = await updateTask({
          variables: {
            taskId: editingTask._id,
            title: taskData.title,
            description: taskData.description || "",
            status: taskData.status || "To Do",
            dueDate: taskData.dueDate || null,
          },
        });
        setEditingTask(null);
      } else {
        await addTask({
          variables: {
            title: taskData.title,
            description: taskData.description || "",
            status: taskData.status || "To Do",
            dueDate: taskData.dueDate || null,
          },
        });
      }
      refetch();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask({
        variables: { taskId },
      });
      refetch();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  const tasks = data?.tasks || [];

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <TaskForm handleSaveTask={handleSaveTask} editingTask={editingTask} />
      <div className="spacer"></div>
      <hr className="divider" />
      <h3>Your Tasks</h3>
      <TaskList tasks={tasks} setEditingTask={setEditingTask} handleDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default Dashboard;