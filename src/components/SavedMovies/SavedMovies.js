import React from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"

function SavedMovies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  )
}

export default SavedMovies