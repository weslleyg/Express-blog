import React from "react";
import { withRouter } from "react-router-dom";

import useForm from "../../components/useForm";
import api from "../../services/api";
import { login } from "../../services/auth";

const SignUpForm = props => {
  const { values, handleChange, handleSubmit } = useForm(register);

  async function register() {
    const response = await api.post("/user", values);
    login(response.data.token);
    props.history.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input type="text" name="username" onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" onChange={handleChange} required />

      <label>Senha</label>
      <input type="password" name="password" onChange={handleChange} required />

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default withRouter(SignUpForm);
