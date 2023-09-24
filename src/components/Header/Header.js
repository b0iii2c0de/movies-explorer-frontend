import React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import "./Header.css"
import headerLogo from "../../images/header-logo.svg"
import mobileMenu from "../../images/icon-menu.svg"
import Navigation from "../Navigation/Navigation"

function Header() {
  const [isClicked, setIsClicked] = React.useState(false)
  const activeColorLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  const location = useLocation()

  function handleOpenMobileMenu() {
    setIsClicked(true)
  }

  function handleCloseMobileMenu() {
    setIsClicked(false)
  }

  // отображать первый хедер
  const shouldShowOneHeader = () => {
    const { pathname } = location
    return pathname === "/"
  }

  // отображать второй хедер
  const shouldShowTwoHeader = () => {
    const { pathname } = location
    return (
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    )
  }

  return (
    <>
      {shouldShowOneHeader() && (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={headerLogo} alt="Логотип" />
          </Link>
          <nav className="header__links">
            <NavLink to="/signup" className="header__button">
              Регистрация
            </NavLink>
            <NavLink to="/signin" className="header__button header__button-green">
              Войти
            </NavLink>
          </nav>
        </header>
      )}

      {shouldShowTwoHeader() && (
        <header className="header header__dark">
          <Link to="/" className="form__logo">
            <img src={headerLogo} alt="Логотип" />
          </Link>
          <nav className="header__links header__links_films">
            <NavLink to="/movies" className={activeColorLink}>
              Фильмы
            </NavLink>

            <NavLink to="/saved-movies" className={activeColorLink}>
              Сохранённые фильмы
            </NavLink>
          </nav>
          <nav className="header__links">
            <NavLink to="/profile" className="header__account-btn">
              Аккаунт
            </NavLink>
            <button
              className="header__mobile-btn"
              type="button"
              onClick={handleOpenMobileMenu}
            >
              <img src={mobileMenu} alt="Кнопка мобильного меню" />
            </button>
          </nav>
          {isClicked ? (
            <Navigation handleCloseMobileMenu={handleCloseMobileMenu} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header
