import { ContainerFilled, ContainerOutlined } from "@ant-design/icons";

interface Props {
  active: boolean;
}

const NoteStatusIndicator = ({active }: Props) => {
  return active ? (
    <ContainerFilled
      className="status-indicator"
      style={{
        color: "yellow",
      }}
      onClick={event => {
        event.stopPropagation();
      }}
    />
  ) : (
    <ContainerOutlined
      className="status-indicator"
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );
};

export default NoteStatusIndicator;
