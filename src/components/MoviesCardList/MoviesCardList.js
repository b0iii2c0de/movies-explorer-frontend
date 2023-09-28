import React, { useCallback, useEffect, useState } from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import "./MoviesCardList.css"
import { useLocation } from "react-router-dom"

function MoviesCardList({ movies, onClick, searchText, savedMovies }) {
  const location = useLocation();
  const pageSavedMovies = location.pathname === "/saved-movies";
  const [initialCount, setInitialCount] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    if (windowWidth !== window.innerWidth) {
      setWindowWidth(window.innerWidth);
    }
  }, [windowWidth]);

  useEffect(() => {
    let resizeTimer;
    const delayedWindowResizeHandler = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        handleWindowResize();
      }, 100);
    };

    window.addEventListener("resize", delayedWindowResizeHandler);

    return () => {
      window.removeEventListener("resize", delayedWindowResizeHandler);
    };
  }, [handleWindowResize]);

  const additionСount = () => {
    switch (true) {
      case windowWidth > 1223:
        setInitialCount((prev) => prev + 3);
        break;
      default:
        setInitialCount((prev) => prev + 2);
        break;
    }
  };

  useEffect(() => {
    switch (true) {
      case windowWidth > 1023:
        setInitialCount(12);
        break;
      case windowWidth <= 1023 && windowWidth > 750:
        setInitialCount(8);
        break;
      case windowWidth >= 320 && windowWidth <= 1023:
        setInitialCount(5);
        break;
      default:
        break;
    }
  }, [windowWidth]);

  const resultsMessage = () => {
    if (location.pathname === "/saved-movies") {
      return searchText ? "Ничего не найдено." : savedMovies && savedMovies.length !== 0 ? "У вас нет сохраненных фильмов" : "Нужно ввести ключевое слово";
    } else {
      return searchText ? "Ничего не найдено." : "Нужно ввести ключевое слово";
    }
  };

  const handleIsLike = (movie) => {
    if (!pageSavedMovies) {
      const savedMovie = savedMovies.find((film) => film.movieId === movie.id);
      return !!savedMovie;
    }
    return true;
  };

  return (
    <section className="cards">
      {movies.length === 0 ? (<p className="cards-message">{resultsMessage()}</p>) :
        (<>
          <ul className="cards__list">
            {pageSavedMovies ?
              movies.map(item => {
                return <MoviesCard movie={item} key={pageSavedMovies ? item._id : item.id} onClick={onClick} handleIsLike={handleIsLike(item)} />
              }) : movies.slice(0, initialCount).map(item => { return <MoviesCard movie={item} key={pageSavedMovies ? item._id : item.id} onClick={onClick} handleIsLike={handleIsLike(item)} /> })
            }
          </ul>
          <div className="cards__button-container">
            {location.pathname === "/movies" && (<button className="cards__button" type="button" onClick={additionСount}>Ещё</button>)}
          </div>
        </>)}
      <SearchError errorText={"Ничего не найдено"} />
      <SearchError
        errorText={
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        }
      />

    </section>
  )
}

export default MoviesCardList
