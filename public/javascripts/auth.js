function getToken() {
  localStorage.getItem(tokenKey());
}

function loginToken(data) {
  localStorage.setItem(tokenKey(), data);
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
}

login = async (data = getData()) => {
  try {
    document.getElementById("form").preventDefault();
    const response = await api.post("/user/login", data);
    loginToken(response.data.token);
  } catch (err) {
    error: "Deu ruim";
  }
};
