import { ContainerFilled, ContainerOutlined } from "@ant-design/icons";

interface Props {
  relatedId: number;
  active: boolean;
}

const NoteStatusIndicator = ({ relatedId, active }: Props) => {
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
