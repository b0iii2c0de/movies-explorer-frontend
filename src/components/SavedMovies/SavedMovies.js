import React, { useEffect, useState } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"

function SavedMovies({ filterByName, filterIsShort, savedMovies, onDeleteMovie, currentUser }) {
  const [searchTextValidate, setSearchTextValidate] = useState("");
  const [filterMovies, setFilterMovies] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [text, setText] = useState("");



  const handleSearchMovies = async (textStringSearch) => {
    if (savedMovies) {
      setSearchTextValidate("");
      setFilterMovies(filterByName(savedMovies, textStringSearch));
      setText(textStringSearch);
    }
  };

  useEffect(() => {
    if (savedMovies) {
      const moviesVisible = filterByName(savedMovies, text);
      if (moviesVisible.length === 0) {
        setSearchTextValidate("Ничего не найдено");
      }
      setFilterMovies(
        isShortMovie ? filterIsShort(moviesVisible) : moviesVisible
      );
      return;
    }
    setFilterMovies([])

    // setSearchTextValidate("");
  }, [filterByName, filterIsShort, isShortMovie, savedMovies, currentUser]);

  useEffect(() => {
    console.log(filterMovies)
  }, [filterMovies, text])

  const handleCheckbox = () => {
    if (savedMovies) {
      setIsShortMovie(!isShortMovie);
    }
  };



  const handleDelete = ({ _id: id }) => {
    onDeleteMovie(id)
  }

  return (<>
    <main className="movies">
      <SearchForm onCheckboxChange={handleCheckbox} onSubmit={handleSearchMovies} isShortMovie={isShortMovie} />
      <MoviesCardList movies={filterMovies}
        searchTextValidate={searchTextValidate} onClick={handleDelete} currentUser={currentUser} />

    </main>
    <Footer />
  </>
  )
}

export default SavedMovies;