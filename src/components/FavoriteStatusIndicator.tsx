// Ant Design
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface Props {
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

const FavoriteStatusIndicator = ({ active, onClick }: Props) => {
  return active ? (
    <HeartFilled
      className="status-indicator"
      onClick={onClick}
      style={{
        color: "red",
      }}
    />
  ) : (
    <HeartOutlined className="status-indicator" onClick={onClick} />
  );
};

export default FavoriteStatusIndicator;
