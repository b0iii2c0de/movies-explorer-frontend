import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import logo from "../../images/header-logo.svg"

function Form({ title, buttonText, question, linkText, children, link, onSubmit, isValid, resetErrorGlobal }) {

  function handleClick() {
    resetErrorGlobal();
  }

  useEffect(() => {
    return handleClick;
  }, []);

  return (
    <>
      <div className="form__container">
        <Link to="/" className="form__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className="form__title">{title}</h1>
        <form className="form" id="form" noValidate onSubmit={onSubmit}>
          {children}
          <button
            disabled={!isValid}
            type="submit"
            className={!isValid ? "form-container__button_disabled" : "form__button-save"}>
            {buttonText}
          </button>
        </form>
        <p className="form__text">
          {question}
          <Link to={link} className="form__link" onClick={handleClick}>
            {linkText}
          </Link>
        </p>
      </div>
    </>
  )
}

export default Form
