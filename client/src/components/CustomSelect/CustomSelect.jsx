import React from "react";

const CustomSelect = ({ props }) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <select
        className="form-select"
        value={props.value}
        onChange={props.handleCHange}
      >
        {props.options.map((option) => (
          <option
            key={option.title}
            value={option.value}
            className="form-select"
          >
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
