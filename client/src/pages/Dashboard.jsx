import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS } from "../utils/queries";
import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../utils/mutations";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { loading, data, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

console.log(loading);

  const [currentTask, setCurrentTask] = useState(null);
  const tasks = data?.tasks || [];

  const handleSaveTask = async (taskData) => {
    if (currentTask) {
      await updateTask({ variables: { ...taskData, taskId: currentTask._id } });
    } else {
      await addTask({ variables: taskData });
    }
    setCurrentTask(null);
    refetch();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask({ variables: { taskId } });
    refetch();
  };

  return (
    <div>
      <TaskList
        tasks={tasks}
        onEdit={setCurrentTask}
        onDelete={handleDeleteTask}
      />
      <TaskForm
        task={currentTask}
        onSave={handleSaveTask}
        onCancel={() => setCurrentTask(null)}
      />
    </div>
  );
};

export default Dashboard;