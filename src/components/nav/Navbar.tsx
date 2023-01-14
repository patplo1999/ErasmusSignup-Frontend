// React
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Redux
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import { fetchOAuthUrl, logOut, logOutLocally } from "storage/redux/loginSlice";
import { RootState } from "storage/redux/store";
import RequestStatus from "storage/redux/RequestStatus";
// Styles
import "./Navbar.scss";
// Assets
import pwrlogo from "assets/pwr.webp";
import eulogo from "assets/erasmus.webp";
// Components
import NavbarLink from "./NavbarLink";
import FullViewLoading from "components/FullViewLoading";
import NavLinkData from "./NavLinkData";
// Data
import { anonymousUserLinks, loggedInUserLinks } from "./links";

const Navbar = () => {
  const { userLoggedIn, status } = useAppSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [links, setLinks] = useState<NavLinkData[]>([]);

  // Handles filling navbar with links
  useEffect(() => {
    const linkList = userLoggedIn
      ? loggedInUserLinks(dispatch, logOut, logOutLocally)
      : anonymousUserLinks(dispatch, fetchOAuthUrl);

    setLinks(linkList);
  }, [userLoggedIn]);

  // Handles navbar feedback
  useEffect(() => {
    const currentLocation = pathname.slice(1);
    if (currentLocation === "" || links.length === 0) {
      return;
    }

    const matchingPaths = links.filter(l => l.path && currentLocation.includes(l.path));

    if (matchingPaths.length === 0) {
      setActiveId(null);
      return;
    }

    setActiveId(matchingPaths[0].id);
  }, [pathname, links]);

  return (
    <>
      {status === RequestStatus.loading && <FullViewLoading />}
      <nav className="nav">
        <img src={pwrlogo} alt="pwr logo" />
        <img src={eulogo} alt="eu logo" style={{ marginRight: "auto" }} />
        {links.map(link => (
          <NavbarLink
            key={link.id}
            text={link.text}
            path={`/${link.path}`}
            active={link.id === activeId && link.path !== undefined}
            customOnClick={link.customOnClick}
          />
        ))}
      </nav>
    </>
  );
};

export default Navbar;
