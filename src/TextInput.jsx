import React from "react";

const TextInput = ({ value, id, required, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      id={id}
      required={required}
      onChange={onChange}
      className="item-input"
    />
  );
};

export default TextInput;
