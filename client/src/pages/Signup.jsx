import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });
      Auth.login(data.addUser.token); // Log in new user & redirect
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" type="text" placeholder="Username" value={formState.username} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formState.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formState.password} onChange={handleChange} required />
      <button type="submit">Signup</button>
      {error && <p className="error-text">Signup failed. Please try again.</p>}
    </form>
  );
};

export default Signup;