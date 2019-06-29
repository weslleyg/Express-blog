const TOKEN_KEY = "projeto_app";

axios.defaults.baseURL = "http://localhost:3333";
axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function getToken() {
  localStorage.getItem(TOKEN_KEY);
}

function loginToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getData() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  return data;
}

login = async (data = getData()) => {
  try {
    const response = await axios.post(`/user/login`, data);
    loginToken(response.data.token);
    console.log(response);
  } catch (err) {
    error: "Deu ruim";
  }
};
