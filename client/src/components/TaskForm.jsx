import React, { useState } from "react";

const TaskForm = ({ handleSaveTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do", // Default value
    dueDate: "", // Default value
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof handleSaveTask === "function") {
      handleSaveTask(formData); // Pass formData to handleSaveTask
      setFormData({
        title: "",
        description: "",
        status: "To Do",
        dueDate: "",
      }); // Reset the form after submission
    } else {
      console.error("handleSaveTask is not a function");
    }
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
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;