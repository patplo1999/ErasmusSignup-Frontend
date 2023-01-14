interface Props {
  label?: string;
  text: string | number;
  style?: React.CSSProperties;
}

const BlockLabeledTextField = ({ label = "", text, style }: Props) => {
  return (
    <div className="block-labeled-text-field" style={style}>
      <div className="label">
        <h2>{label}</h2>
      </div>
      <div className="text">
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default BlockLabeledTextField;
