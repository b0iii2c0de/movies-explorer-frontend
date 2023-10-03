import React, { useEffect, useState } from "react"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"
import { useLocation } from "react-router-dom";

function SearchForm({ onSubmit, onCheckboxChange, isShortMovies }) {
  const location = useLocation()
  const [values, setValues] = useState("");

  useEffect(() => {
    if (location.pathname === "/movies") {
      const textSearch = localStorage.getItem("textSearch")
      if (textSearch) {
        setValues({ query: textSearch })
      }
    } else {
      setValues("")
    }
  }, [setValues, location])

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    onSubmit(values.query, isShortMovies);

  };

  return (
    <section className="search">
      <form className="search__container" id="form" onSubmit={handleSearch} noValidate>
        <div className="search__form">
          <input
            type="text"
            name="query"
            id="search-input"
            placeholder="Фильм"
            className="search__form-input"
            required
            onChange={handleChange}
            value={values.query || ""}

          />
          <button type="submit" className="search__form-button"></button>
        </div>
        <FilterCheckbox onCheckboxChange={onCheckboxChange} value={isShortMovies} />
      </form>
    </section>
  )
}

export default SearchForm
