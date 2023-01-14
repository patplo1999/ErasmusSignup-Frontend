import { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  path?: string;
  active: boolean;
  customOnClick?: MouseEventHandler<HTMLAnchorElement>;
}

const NavbarLink = ({ text, path = "", active, customOnClick }: Props) => {
  const [hoveredOver, setHoveredOver] = useState<boolean>(false);

  const determineUnderLineWidth = (): string => {
    if (active) return "100%";
    if (hoveredOver) return "40%";
    return "0%";
  };

  useEffect(() => {
    setHoveredOver(active);
  }, [active]);

  return (
    <span
      className="link"
      onMouseEnter={() => {
        if (active === false) {
          setHoveredOver(true);
        }
      }}
      onMouseLeave={() => {
        if (active === false) {
          setHoveredOver(false);
        }
      }}>
      <Link to={path} onClick={customOnClick ?? undefined}>
        {text}
      </Link>
      <div className="underline" style={{ width: determineUnderLineWidth() }}></div>
    </span>
  );
};

export default NavbarLink;
