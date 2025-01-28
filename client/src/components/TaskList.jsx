import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <p>No tasks found. Add a task to get started!</p>;
  }

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;