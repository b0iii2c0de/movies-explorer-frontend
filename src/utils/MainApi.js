class MainApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
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
            headers: this._headers
        }).then((res) => this._checkResponse(res))
    }

    setUserInfo(data) {
        return fetch(this._url + "/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        }).then((res) => this._checkResponse(res))
    }

    addSaveMovie(data) {
        return fetch(this._url + "/movies", {
            method: "POST",
            headers: this._headers,
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
            headers: this._headers
        }).then((res) => this._checkResponse(res))
    }

    deleteMovie(movieId) {
        return fetch(this._url + "/movies/" + movieId, {
            method: "DELETE",
            headers: this._headers
        }).then((res) => this._checkResponse(res))
    }
}

export const mainApi = new MainApi({
    // Поменять url до заливки на сервер
    url: "http://localhost:3000",
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json"
    }
})