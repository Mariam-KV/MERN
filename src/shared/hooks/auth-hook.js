import { useState, useCallback, useEffect } from "react";
let logoutTimer;
export default function useAuthHook() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpDate, setTokenExpDate] = useState();
  const login = useCallback((uid, token, expiration) => {
    setUserId(uid);
    setToken(token);
    //creating expiration date
    const tokenExpirationDate =
      //we will have expiration if we logged in automatically and  already have had a token
      expiration ||
      new Date(
        //generates new date + 1 hour -> token expiration date
        new Date().getTime() + 1000 * 60 * 60
      );
    //we will have correct expiration date across the whole file
    setTokenExpDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        //toISOString -> This is a special kind of string which basically stores all the important date information and which importantly can be converted back to a date later.
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpDate(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    //it ever changed because we locked in no matter if we logged in through the form or through auto login or it changed because we logged out.
    if (token && tokenExpDate) {
      //calculate remaining time
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      //expiration time changes whenever we call login
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);
  useEffect(() => {
    let userData;
    try {
      userData = JSON.parse(localStorage.getItem("userData"));
    } catch (err) {}

    if (
      userData &&
      userData?.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);
  return { token, login, logout, userId };
}
