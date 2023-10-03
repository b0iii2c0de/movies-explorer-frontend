class MainApi {
    constructor({ url }) {
        this._url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(this._url + "/users/me", {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
        }).then((res) => this._checkResponse(res))
    }

    setUserInfo(data) {
        return fetch(this._url + "/users/me", {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        }).then((res) => this._checkResponse(res))
    }

    addSaveMovie(data) {
        return fetch(this._url + "/movies", {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
            })
        }).then((res) => this._checkResponse(res))
    }

    getInitialSavedMovies() {
        return fetch(this._url + "/movies", {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
        }).then((res) => this._checkResponse(res))
    }

    deleteMovie(movieId) {
        return fetch(this._url + "/movies/" + movieId, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            },
        }).then((res) => this._checkResponse(res))
    }
}

export const mainApi = new MainApi({
    // Поменять url до заливки на сервер
    url: "https://api.nofaptv.nomoredomainsrocks.ru",
})