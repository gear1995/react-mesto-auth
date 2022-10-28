import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import imageError from "../images/failure.svg";
import imageSuccess from "../images/Success.svg";
import { infoToolTipErrorMessage } from "../utils/components";
import { infoToolTipSucsessMessage } from "../utils/components";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [title, setTitle] = useState("");

  const history = useHistory();

  useEffect(() => {
    document.body.classList.add("page");

    return () => {
      document.body.classList.remove("page");
    };
  });

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    console.log(isLiked);
    api
      .changeLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id && i));
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);

        closeAllPopups();
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  function handleLogin(data) {
    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          tokenCheck();
          history.push("/");
        }
      })
      .catch((error) => {
        setInfoTooltipImage(imageError);
        setTitle(infoToolTipErrorMessage);
        setInfoTooltipOpen(true);

        console.log(error);
      });
  }

  function handleRegister(registerData) {
    auth
      .register(registerData)
      .then(() => {
        setInfoTooltipImage(imageSuccess);
        setTitle(infoToolTipSucsessMessage);
        setInfoTooltipOpen(true);
        console.log(history.push("/sign-in"));
        history.push("/sign-in");
      })
      .catch((error) => {
        setInfoTooltipImage(imageError);
        setTitle(infoToolTipErrorMessage);
        setInfoTooltipOpen(true);
        console.log(error);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res.data) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          loggedIn={loggedIn}
        />

        <Route exact path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>

        <Route exact path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>

        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
      />

      <InfoTooltip
        onOverlayClose={handleOverlayClose}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        image={infoTooltipImage}
        title={title}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
