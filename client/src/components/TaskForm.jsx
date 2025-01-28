import React, { useState } from "react";

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "To Do",
    dueDate: task?.dueDate || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{task ? "Edit Task" : "Add Task"}</h2>
      <input
        name="title"
        type="text"
        placeholder="Task Title"
        value={formState.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formState.description}
        onChange={handleChange}
      />
      <select
        name="status"
        value={formState.status}
        onChange={handleChange}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        name="dueDate"
        type="date"
        value={formState.dueDate}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;