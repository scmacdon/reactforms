import React from "react";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import TextArea from "./TextArea";

const FormElementRenderer = ({ item, onChange }) => {
  const handleChange = (updates) => onChange(item, updates);

  switch (item.type) {
    case "Text":
      return (
        <TextInput
          value={item.text}
          id={item.id}
          required={item.required}
          onChange={(e) => handleChange({ text: e.target.value })}
        />
      );
    case "Radio":
      return (
        <RadioInput
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
          name={item.id}
          selectedValue={item.text}
          onChange={(value) => handleChange({ text: value })}
        />
      );
    case "TextArea":
      return (
        <TextArea
          value={item.text}
          id={item.id}
          required={item.required}
          onChange={(e) => handleChange({ text: e.target.value })}
        />
      );
    default:
      return null;
  }
};

export default FormElementRenderer;
