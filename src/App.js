import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login.js";
import "./css/App.css";
import { selectUser, login, logout } from "./features/userSlice";
import Imessage from "./Imessage";
import { auth } from "./firebase.js";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
        //  user is logged in
      } else {
        //  user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Imessage />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
