import React from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"

function SavedMovies() {
  return (<>
    <main className="movies">
      <SearchForm />
      <MoviesCardList />

    </main>
    <Footer />
  </>
  )
}

export default SavedMovies