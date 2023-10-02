import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Profile.css"
import { CurrentUserContext } from "../Context/CurrentUserContext"
import useValidator from "../../hooks/useValidator"
import "../Form/Form.css"

function Profile({ exit, onSubmit, errorGlobal, resetErrorGlobal }) {
  const currentUser = useContext(CurrentUserContext)
  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
  } = useValidator()

  const [isChange, setIsChange] = useState(false)

  useEffect(() => {

    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
  }, [currentUser, values]);

  useEffect(() => {

    resetForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
    })
    setIsChange(false)
  }, [currentUser, resetForm, errorGlobal])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    handleChange(e)

    if (name === "name" || name === "email") {
      setIsChange(true)
    }
  }

  const handleSaveClick = () => {
    if (isValid) {
      const newUserData = {
        name: values.name,
        email: values.email,
      }
      onSubmit(newUserData)
      resetErrorGlobal();
    }
  }

  return (
    <main>
      <section className="profile">
        <h1 className="profile__welcome">{`Привет, ${currentUser.name}!`}</h1>
        <form id="form" className="profile__form" noValidate >
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
              pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*"
              onChange={handleInputChange}
              value={values.name || ""}
            />
            <span className="profile__form-text">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              type="email"
              required
              placeholder="почта"
              onChange={handleInputChange}
              value={values.email || ""}
            />
            <span className="profile__form-text">{errors.email}</span>
          </label>
          <span className="form-container__error form-container__error_api">{errorGlobal}</span>
          <button
            className={!isChange || !isValid ? "profile__button-save_disabled" : "profile__button-save"}
            type="button"
            onClick={handleSaveClick}
            disabled={!isChange || !isValid}
          >

            Редактировать
          </button>
          <Link to="/" type="button" className="profile__link" onClick={exit}>
            Выйти из аккаунта
          </Link>

        </form>
      </section>
    </main>
  )
}

export default Profile

