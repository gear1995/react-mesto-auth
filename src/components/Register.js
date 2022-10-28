import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
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
    onRegister(userData);
  };

  return (
    <>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <h2 className="form__header">Регистрация</h2>

        <input
          className="form__input "
          type="email"
          id="login-email"
          aria-label="электронная почта"
          placeholder="Email"
          name="email"
          required
          maxLength="30"
          value={userData.email}
          onChange={handleChange}
        />
        <span className="error-massage"></span>

        <input
          className="form__input "
          type="password"
          id="login-password"
          aria-label="пароль"
          placeholder="Пароль"
          name="password"
          required
          value={userData.password}
          onChange={handleChange}
        />
        <span className="error-massage"></span>

        <button className="form__save-button" type="submit">
          Зарегистрироваться
        </button>

        <div className="form__login-container">
          <p className="form__login-text">Уже зарегистрированы? </p>
          <Link className="form__login-link" to="/sign-in">
            Войти
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
