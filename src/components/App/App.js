import React, { useEffect, useState } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import Register from "../Register/Register"
import Login from "../Login/Login"
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import PageNotFound from "../PageNotFound/PageNotFound"
import Movies from "../Movies/Movies"
import "./App.css"
import UnknownUserRoute from "../UnknownUserRoute/UnknownUserRoute"
import * as auth from "../../utils/Authorise"
import { CurrentUserContext } from "../Context/CurrentUserContext"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import { mainApi } from "../../utils/MainApi"

function App() {
  const location = useLocation()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [errorGlobal, setErrorGlobal] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);

  function resetErrorGlobal() {
    setErrorGlobal("");
  }

  const handleLoginSubmit = (userInfo) => {
    auth
      .authorize(userInfo)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true)
          setCurrentUser({});
          navigate("/movies", { replace: true })
          window.location.reload()
        }
      })
      .catch((err) => {
        setErrorGlobal(err.message)
      })
  }


  const handleRegister = (data) => {
    auth
      .register(data)
      .then((userInfo) => {
        // console.log(userInfo)
        handleLoginSubmit({ email: data.email, password: data.password })
        setCurrentUser(userInfo)
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setErrorGlobal(err.message)
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          console.log(data)
          setCurrentUser(data)
        })
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [isLoggedIn])

  const shouldShowFooter = () => {
    const { pathname } = location
    return pathname === "/"
  }


  const renderHeader = (path) => {
    const coordinated = [
      '/',
      '/movies',
      '/saved-movies',
      '/profile',
    ]
    return coordinated.includes(path.pathname);
  }

  useEffect(() => {
    const tokenUser = localStorage.getItem("token")
    if (tokenUser) {
      auth
        .checkToken(tokenUser)
        .then(() => {
          setIsLoggedIn(true)
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }
  }, [isLoggedIn, errorGlobal])

  const exit = () => {
    setIsLoggedIn(false)
    localStorage.clear();
    navigate("/")

  }

  function handleUpdateUser(data) {
    mainApi
      .setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo)

      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }



  const filterShort = (movies) => {
    const filteredMovies = [];

    for (const movie of movies) {
      if (movie.duration <= 40) {
        filteredMovies.push(movie);
      }
    }
    return filteredMovies;
  };

  const filterByName = (movies, text) => {
    const lowercase = text.toLowerCase();

    return movies.filter((movie) => {
      const { nameRU, nameEN } = movie;

      return (
        nameRU.toLowerCase().includes(lowercase) ||
        nameEN.toLowerCase().includes(lowercase)
      );
    });
  };

  const onDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(({ _id: deleteMovieId }) => {
        const newSavedMovies = savedMovies.filter(
          ({ _id }) => _id !== deleteMovieId
        );
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .addSaveMovie(movie)
      .then((myMovie) => {
        setSavedMovies([...savedMovies, myMovie])
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getInitialSavedMovies()
        .then((myMovies) => {

          setSavedMovies(myMovies);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          {renderHeader(location) && <Header isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route path="/"
              element={<Main />} />
            <Route path="/movies" element={<ProtectedRoute
              isLoggedIn={isLoggedIn}
              filterByName={filterByName}
              filterIsShort={filterShort}
              savedMovies={savedMovies}
              onSaveMovies={handleSaveMovie}
              onDeleteMovie={onDeleteMovie}
              element={Movies} />} />
            <Route path="/saved-movies" element={<ProtectedRoute
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              filterByName={filterByName}
              filterIsShort={filterShort}
              savedMovies={savedMovies}
              onDeleteMovie={onDeleteMovie}
              element={SavedMovies} />} />
            <Route path="/profile" element={<ProtectedRoute
              isLoggedIn={isLoggedIn}
              onSubmit={handleUpdateUser}
              exit={exit}
              element={Profile}
            />} />
            <Route path="/signup" element={<UnknownUserRoute
              isLoggedIn={isLoggedIn}
              element={Register}
              handleRegister={handleRegister}
              resetErrorGlobal={resetErrorGlobal}
              errorGlobal={errorGlobal}
            />} />
            <Route path="/signin" element={<UnknownUserRoute
              element={Login}
              onSubmit={handleLoginSubmit}
              resetErrorGlobal={resetErrorGlobal}
              errorGlobal={errorGlobal} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {shouldShowFooter() && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
