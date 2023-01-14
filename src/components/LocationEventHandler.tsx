// React
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
// Redux
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import { logIn, logOut, logOutLocally } from "storage/redux/loginSlice";
import { RootState } from "storage/redux/store";
// Utilities
import decodeJwt from "utilities/decodeJwt";

const LocationEventHandler = () => {
  const { userLoggedIn } = useAppSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Handles OAuth callback
  useEffect(() => {
    const oAuthToken = searchParams.get("oauth_token");
    const oAuthVerifier = searchParams.get("oauth_verifier");
    searchParams.delete("oauth_token");
    searchParams.delete("oauth_verifier");
    setSearchParams(searchParams);

    if (oAuthToken && oAuthVerifier) {
      dispatch(logIn({ oAuthToken, oAuthVerifier }));
    }
  }, [searchParams]);

  // Handles monitoring JWT expiry
  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken === null) {
      if (userLoggedIn) {
        dispatch(logOutLocally());
      }
      return;
    }

    const tokenPayload = decodeJwt(accessToken);
    if (Date.now() > tokenPayload.exp * 1000) {
      dispatch(logOut());
      dispatch(logOutLocally());
    }
  }, [location]);

  return <></>;
};

export default LocationEventHandler;
