interface Props {
  label?: string;
  text: string;
}

const UnderlinedLabeledTextField = ({ label = "", text }: Props) => {
  return (
    <div>
      <div style={{ borderBottom: "1px solid black" }}>
        <h2 style={{ margin: "0" }}>{text}</h2>
      </div>
      <h5
        style={{
          position: "relative",
          float: "right",
          marginRight: "1rem",
          lineHeight: "1.2",
        }}>
        {label}
      </h5>
    </div>
  );
};

export default UnderlinedLabeledTextField;
