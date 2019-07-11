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
    <div className="container">
      <form class="text-center border border-light" onSubmit={handleSubmit}>
        <p class="h4 mb-4">Cadastrar-se</p>

        <input
          type="text"
          name="username"
          onChange={handleChange}
          id="defaultLoginFormUsername"
          class="form-control mb-4"
          placeholder="Username"
        />

        <input
          type="email"
          name="email"
          onChange={handleChange}
          id="defaultLoginFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
        />

        <input
          type="password"
          name="password"
          id="defaultLoginFormPassword"
          class="form-control mb-4"
          placeholder="Password"
        />

        <button class="btn btn-info btn-block my-4" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default withRouter(SignUpForm);
