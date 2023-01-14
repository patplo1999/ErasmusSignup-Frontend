import React from "react";

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const InlineItems = ({ children, style }: Props) => {
  return (
    <span className="inline-contents" style={style}>
      {children}
    </span>
  );
};

export default InlineItems;
