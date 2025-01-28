import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TASKS, QUERY_ME } from "../graphql";
import { CREATE_TASK, INVITE_COLLABORATOR } from "../graphql";

const Home = () => {
  const { loading, data } = useQuery(QUERY_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [inviteCollaborator] = useMutation(INVITE_COLLABORATOR);

  const tasks = data?.tasks || [];
  const [taskTitle, setTaskTitle] = useState("");
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  const handleCreateTask = async () => {
    if (!taskTitle) return;
    try {
      await createTask({ variables: { title: taskTitle, description: "" } });
      setTaskTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInviteCollaborator = async () => {
    if (!selectedTask || !collaboratorEmail) return;
    try {
      await inviteCollaborator({
        variables: { taskId: selectedTask, email: collaboratorEmail },
      });
      setCollaboratorEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            <button onClick={() => setSelectedTask(task._id)}>
              Invite Collaborator
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button onClick={handleCreateTask}>Add Task</button>
      {selectedTask && (
        <div>
          <input
            type="email"
            placeholder="Collaborator Email"
            value={collaboratorEmail}
            onChange={(e) => setCollaboratorEmail(e.target.value)}
          />
          <button onClick={handleInviteCollaborator}>Invite</button>
        </div>
      )}
    </div>
  );
};

export default Home;
