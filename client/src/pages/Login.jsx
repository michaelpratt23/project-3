import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token); // Log in & redirect to dashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input name="email" type="email" placeholder="Email" value={formState.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formState.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-text">Login failed. Please try again.</p>}
    </div>
  );
};

export default Login;