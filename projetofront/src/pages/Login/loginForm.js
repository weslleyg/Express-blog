import React from "react";
import useForm from "../../components/useForm";

const LoginForm = () => {
  const { values, handleChange, handleSubmit } = useForm(login);

  function login() {
    console.log(values);
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

export default LoginForm;
