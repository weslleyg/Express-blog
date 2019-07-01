import React from "react";
import { withRouter } from "react-router-dom";

import useForm from "../../components/useForm";
import api from "../../services/api";
import { login } from "../../services/auth";

const LoginForm = props => {
  const { values, handleChange, handleSubmit } = useForm(Login);

  async function Login() {
    const response = await api.post("/user/login", values);
    login(response.data.token);
    props.history.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" name="email" onChange={handleChange} required />

      <label>Senha</label>
      <input type="password" name="password" onChange={handleChange} required />

      <button type="submit">Login</button>
    </form>
  );
};

export default withRouter(LoginForm);
