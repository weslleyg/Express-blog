const api = require("./api");

function getToken() {
  localStorage.getItem(tokenKey());
}

function tokenKey() {
  return "projeto_app";
}

function getData() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };
  console.log(data);
  console.log(login());
}

login = async (data = getData()) => {
  try {
    const response = await api.post("/user/login", data);
    console.log(response);
  } catch (err) {
    error: "Deu ruim";
  }
};
