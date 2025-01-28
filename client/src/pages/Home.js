import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      _id
      title
      description
      status
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  const tasks = data?.tasks || [];

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
