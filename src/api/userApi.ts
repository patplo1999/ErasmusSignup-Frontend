import { default as axios } from "lib/axios";
import OAuthData from "models/OAuthData";
import { User } from "models/User";
import UserPreferences from "models/UserPreferences";
import GetAccessTokenQueryParams from "./DTOs/GET/GetAccessTokenQueryParams";

const userApiBaseUrl = "https://userapi23.azurewebsites.net"; //https://userapiservice.azure-api.net
/* oauth */
export const getOAuthUrl = async (): Promise<OAuthData> => {
  return await axios
    .get<OAuthData>(
      `${userApiBaseUrl}/oauth/oauth_url?callbackPath=${encodeURIComponent(
        window.location.href.slice(window.location.origin.length + 1)
      )}`
    )
    .then(response => response.data)
    .catch(error => error);
};

export const getAccessToken = async (queryParams: GetAccessTokenQueryParams): Promise<string> => {
  return await axios
    .get<string>(`${userApiBaseUrl}/oauth/access_token`, {
      params: queryParams,
    })
    .then(response => response.data)
    .catch(error => error);
};

export const revokeAccessToken = async () => {
  return await axios.post(`${userApiBaseUrl}/oauth/revoke_token`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
};

/* user */
export const getCurrentUserData = async (): Promise<User> => {
  return await axios
    .get<User>(`${userApiBaseUrl}/user/current`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const getUserPreferences = async (): Promise<UserPreferences> => {
  return await axios
    .get<UserPreferences>(`${userApiBaseUrl}/user/profiles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};

export const putUserPreferences = async (body: UserPreferences) => {
  return await axios
    .put(`${userApiBaseUrl}/user/profiles`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
};
