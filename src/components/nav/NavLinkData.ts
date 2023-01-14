import { MouseEventHandler } from "react";

interface NavLinkData {
  id: number;
  text: string;
  path?: string;
  customOnClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default NavLinkData;
