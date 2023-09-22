import React from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import "./MoviesCardList.css"
import { useLocation } from "react-router-dom"

function MoviesCardList() {
  const movies = { name: "Фильм" }
  const location = useLocation();

  return (
    <section className="cards">
      <SearchError errorText={"Ничего не найдено"} />
      <SearchError
        errorText={
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        }
      />
      <ul className="cards__list">
        <MoviesCard movies={movies} />
        <MoviesCard movies={movies} />
        <MoviesCard movies={movies} />
      </ul>
      <div className="cards__button-container">
        {location.pathname === "/movies" && (<button className="cards__button" type="button">Ещё</button>)}
      </div>
    </section>
  )
}

export default MoviesCardList
