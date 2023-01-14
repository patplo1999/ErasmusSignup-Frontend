// Styles
import "./Components.scss";

interface Props {
  children: React.ReactNode;
}

const ImageTextCard = ({ children }: Props) => {
  return <div className="card">{children}</div>;
};

export default ImageTextCard;
