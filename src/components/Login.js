import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(userData);
    setUserData({ email: "", password: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__header">Вход</h2>
      <input
        className="form__input"
        type="email"
        id="login-email"
        placeholder="Email"
        name="email"
        required
        maxLength="30"
        value={userData.email}
        onChange={handleChange}
      />
      <span className="error-massage"></span>
      <input
        className="form__input"
        type="password"
        id="login-password"
        placeholder="Пароль"
        name="password"
        required
        value={userData.password}
        onChange={handleChange}
      />
      <span className="error-massage"></span>
      <button className="form__save-button" type="submit">
        Войти
      </button>
    </form>
  );
};

export default Login;
