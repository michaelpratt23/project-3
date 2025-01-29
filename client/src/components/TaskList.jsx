import React from "react";
import { format } from "date-fns";

const TaskList = ({ tasks, setEditingTask, handleDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks found!</p>;
  }

  return (
    <ul className="task-list">
  {tasks.map((task) => (
    <li key={task._id} className="task-item">
      {/* Task Content */}
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>
          Due Date:{" "}
          {task.dueDate
            ? format(new Date(parseInt(task.dueDate)), "MM/dd/yyyy")
            : "No due date"}
        </p>
      </div>
      {/* Task Actions */}
      <div className="task-actions">
        <button onClick={() => setEditingTask(task)} className="edit-button">
          Edit
        </button>
        <button onClick={() => handleDeleteTask(task._id)} className="delete-button">
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
  );
};

export default TaskList;