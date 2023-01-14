/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import NavLinkData from "./NavLinkData";

export const anonymousUserLinks = (
  dispatch: ThunkDispatch<object, undefined, AnyAction>,
  fetchOAuthUrl: Function
): NavLinkData[] => [
  {
    id: 0,
    text: "Home",
    path: "home",
  },
  {
    id: 1,
    text: "Destinations",
    path: "list",
  },
  {
    id: 2,
    text: "Log in",
    customOnClick: event => {
      event.preventDefault();
      dispatch(fetchOAuthUrl());
    },
  },
];

export const loggedInUserLinks = (
  dispatch: ThunkDispatch<object, undefined, AnyAction>,
  logOut: Function,
  logOutLocally: Function
): NavLinkData[] => [
  {
    id: 0,
    text: "Home",
    path: "home",
  },
  {
    id: 1,
    text: "Destinations",
    path: "list",
  },
  // {
  //   id: 2,
  //   text: "Notes",
  //   path: "notes",
  // },
  {
    id: 2,
    text: "Profile",
    path: "profile",
  },
  {
    id: 3,
    text: "Log out",
    customOnClick: event => {
      event.preventDefault();
      dispatch(logOut());
      dispatch(logOutLocally());
    },
  },
];
