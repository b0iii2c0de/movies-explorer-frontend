import React from "react"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

function SearchForm() {
  return (
    <section className="search">
      <form className="search__container" id="form">
        <div className="search__form">
          <input
            type="text"
            name="query"
            id="search-input"
            placeholder="Фильм"
            className="search__form-input"
            required
          />
          <button type="submit" className="search__form-button"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  )
}

export default SearchForm
