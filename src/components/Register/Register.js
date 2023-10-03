import React, { useEffect, useState } from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import useValidator from "../../hooks/useValidator";

function Register({ handleRegister, errorGlobal, resetErrorGlobal, isLoggedIn }) {

  const { values, handleChange, errors, isValid, resetForm } = useValidator();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values)
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <Form onSubmit={handleSubmit}
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        question="Уже зарегистрированы?"
        linkText=" Войти"
        link="/signin"
        isValid={isValid}
        resetErrorGlobal={resetErrorGlobal}
      >
        <label className="form__label">
          Имя
          <input

            onChange={handleChange}
            name="name"
            className="form__input"
            id="name-input"
            type="text"
            pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*"
            minLength="2"
            maxLength="40"
            required
            placeholder="имя"
            value={values.name || ""}
          />
          <span className="form__input-text"> {errors.name}</span>
        </label>
        <label className="form__label">
          E-mail
          <input

            onChange={handleChange}
            name="email"
            className="form__input"
            id="email-input"
            type="email"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            required
            placeholder="почта"
            value={values.email || ""}
          />
          <span className="form__input-text">{errors.email}</span>
        </label>
        <label className="form__label">
          Пароль
          <input
            name="password"
            onChange={handleChange}
            className="form__input"
            id="password-input"
            type="password"
            required
            minLength="6"
            maxLength="14"
            placeholder="пароль"
            value={values.password || ""}
          />
          <span className="form__input-text">{errors.password}</span>
        </label>
        <span className="form-container__error form-container__error_api">{errorGlobal}</span>
      </Form>
    </main>
  )
}

export default Register
