import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import useValidator from "../../hooks/useValidator";

function Login({ onSubmit, errorGlobal, resetErrorGlobal }) {
  const { values, handleChange, errors, isValid } = useValidator();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    resetErrorGlobal()
  };

  return (
    <main>
      <Form
        title="Рады видеть!"
        buttonText="Войти"
        question="Еще не зарегистрированы?"
        linkText=" Регистрация"
        link="/signup"
        noValidate
        onSubmit={handleSubmit}
        isValid={isValid}
        resetErrorGlobal={resetErrorGlobal}
      >
        <label className="form__label">
          E-mail
          <input
            onChange={handleChange}
            name="email"
            className="form__input"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            id="email-input"
            type="email"
            required
            placeholder="почта"
            value={values.email || ""}
          />
          <span className="form__input-text">
            {errors.email}
          </span>
        </label>
        <label className="form__label">
          Пароль
          <input
            name="password"
            onChange={handleChange}
            className="form__input"
            id="password-input"
            type="password"
            minLength="8"
            maxLength="14"
            required
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

export default Login
