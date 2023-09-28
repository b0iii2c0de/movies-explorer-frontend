import React, { useEffect, useState } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import "./Movies.css"
import getInitialMovies from "../../utils/MoviesApi"
import Preloader from "../Preloader/Preloader"

function Movies({
  isLoggedIn,
  filterByName,
  filterIsShort,
  savedMovies,
  onSaveMovies,
  onDeleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const checkShot = JSON.parse(localStorage.getItem("isShort")) ?? false;
  const [isShorts, setIsShorts] = useState(checkShot);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const moviesAll = JSON.parse(localStorage.getItem("allMovies")) ?? [];

  const handleSaveClick = (movies) => {
    const deleteMyMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movies.id);
    if (deleteMyMovie) {
      onDeleteMovie(deleteMyMovie._id);
      return;
    }
    onSaveMovies(movies);
  };

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    if (savedMovies) {
      if (savedMovies.length !== 0) {
        setFilteredMovies(isShorts ? filterIsShort(savedMovies) : savedMovies);
        setIsShorts(JSON.parse(localStorage.getItem("isShort")));
      }
    }
  }, [isShorts, searchText, isLoggedIn]);

  const handleCheckboxChange = () => {
    setIsShorts(!isShorts);

    if (!isShorts) {
      const shortMovies = filterIsShort(filteredMovies);
      setFilteredMovies(shortMovies);
    } else {
      const allMovies = JSON.parse(localStorage.getItem("allMovies")) || [];
      filterAllMovies(allMovies, localStorage.getItem("textSearch"));
    }

    localStorage.setItem("isShort", !isShorts);
  };

  const filterAllMovies = (movies, text, check) => {
    const filteredMovies = filterByName(movies, text);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    setFilteredMovies(check ? filterIsShort(filteredMovies) : filteredMovies);
  };

  const findMovies = (text, isShorts) => {
    setIsLoading(true);
    setSearchText(text);
    if (text) {
      if (moviesAll.length === 0) {
        getInitialMovies()
          .then((data) => {
            localStorage.setItem("allMovies", JSON.stringify(data));
            filterAllMovies(data, text, isShorts);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Ошибка при загрузке фильмов:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        filterAllMovies(moviesAll, text, isShorts);
        setIsLoading(false);
      }
      localStorage.setItem("isShort", isShorts);
      localStorage.setItem("textSearch", text);
    } else {
      localStorage.setItem("textSearch", text);
      filterAllMovies([], text, isShorts);
      setIsLoading(false);
      // setSearchText("");
    }
  };



  return (
    <>
      <main className="movies">
        <SearchForm onSubmit={findMovies} onCheckboxChange={handleCheckboxChange} isShortMovies={isShorts} />
        {isLoading ? <Preloader /> : <MoviesCardList movies={filteredMovies} onClick={handleSaveClick} searchText={searchText} savedMovies={savedMovies} />}
      </main>
      <Footer />
    </>
  )
}

export default Movies