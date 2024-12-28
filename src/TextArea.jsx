import React from "react";

const TextArea = ({ value, id, required, onChange }) => {
  return (
    <textarea
      value={value}
      id={id}
      required={required}
      onChange={onChange}
      className="item-textarea"
    />
  );
};

export default TextArea;
