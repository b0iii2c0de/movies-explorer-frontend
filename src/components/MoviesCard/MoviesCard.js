import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./MoviesCard.css"

function MoviesCard({ movie, handleIsLike, onClick }) {
  const location = useLocation()
  const pageSavedMovies = location.pathname === "/saved-movies"

  function convertTime(number) {
    return `${Math.floor(number / 60)}ч ${number % 60}м`;
  }

  const handleClick = () => {
    onClick(movie)
  };

  const movieImage = location.pathname === "/saved-movies"
    ? movie.image
    : `https://api.nomoreparties.co/${movie.image.url}`;

  return (
    <>
      <li className="card">
        <div className="card__wrapper">
          <Link to={movie.trailerLink} target="_blank"
            rel="noreferrer">
            <img
              src={movieImage}
              className="card__image"
              alt={movie.nameRU}
            />
          </Link>
          <button
            className={`${handleIsLike && !pageSavedMovies ? "card__like-button_active" : "card__like-button"} ${pageSavedMovies && 'card__like-delete'}`}
            type="button"
            onClick={handleClick}
          ></button>
          <div className="card__title-block">
            <h2 className="card__title">{movie.nameRU}</h2>
            <span className="card__time">{convertTime(movie.duration)}</span>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoviesCard
