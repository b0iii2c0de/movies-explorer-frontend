function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}


function getInitialMovies() {
    return fetch("https://api.nomoreparties.co/beatfilm-movies", {
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => checkResponse(res));
}


export default getInitialMovies