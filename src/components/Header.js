import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";
import React from "react";

function Header({ loggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <a href="#" className="header__link" target="_blank">
        <img src={logo} alt="Логотип Mesto Russia" className="logo" />
      </a>
      {!loggedIn && (
        <>
          {
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__nav-link">
                Войти
              </Link>
            </Route>
          }
          {
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__nav-link">
                Регистрация
              </Link>
            </Route>
          }
        </>
      )}

      {loggedIn && (
        <div className="header__container">
          <p className="header__email">{email}</p>
          <a
            className="header__nav-link header__nav-link_logout"
            onClick={onSignOut}
          >
            Выйти
          </a>
        </div>
      )}
    </header>
  );
}
export default Header;
