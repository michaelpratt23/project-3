import React, { useState, useEffect } from "react";

const TaskForm = ({ handleSaveTask, editingTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    dueDate: "",
  });

  // Update formData when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        dueDate: editingTask.dueDate,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "To Do",
        dueDate: "",
      });
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveTask(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <button type="submit">{editingTask ? "Update Task" : "Save Task"}</button>
    </form>
  );
};

export default TaskForm;