export class Api {
  constructor(options) {
    this._host = options.host;
    this._token = options.token;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Ошибка при загрузке данных");
  }

  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkServerResponse(res));
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "content-type": "application/json",
    };
  }

  postCard(data) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkServerResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkServerResponse(res));
  }

  updateUserInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkServerResponse(res));
  }
  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkServerResponse(res));
  }

  setLike(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then((res) => this._checkServerResponse(res));
  }

  deleteLike(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkServerResponse(res));
  }

  changeLikeCard(id, isLiked) {
    if (isLiked) {
      return this.setLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  updateAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkServerResponse(res));
  }
}

export const api = new Api({
  host: "https://mesto.nomoreparties.co/v1/cohort-47",
  token: "2b5dd042-b3e6-48bb-820c-257c3546a5a1",
});

export default api;
