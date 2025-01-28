import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SIGNUP_USER = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { email, password } });
      localStorage.setItem("id_token", data.signup.token);
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
