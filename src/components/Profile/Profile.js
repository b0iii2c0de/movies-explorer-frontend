import React from "react"
import { Link } from "react-router-dom"
import "./Profile.css"

function Profile() {
  return (
    <>
      <section className="profile">
        <h3 className="profile__welcome">Привет, Слава!</h3>
        <form id="form" className="profile__form" noValidate>
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="имя"
            />
            <span className="profile__form-text"></span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              placeholder="почта"
            />
            <span className="profile__form-text"></span>
          </label>
          <button className="profile__button-save" type="submit">
            Редактировать
          </button>
          <Link to="/profile" type="button" className="profile__link">
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  )
}

export default Profile
