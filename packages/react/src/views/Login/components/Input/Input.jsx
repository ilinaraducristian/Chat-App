import React from "react";

// STYLES
import "./Input.scss";

// LIBRARIES
import PropTypes from "prop-types";

// CONSTANTS & MOCKS

// REDUX

// COMPONENTS

const Input = (props) => {
  // PROPS
  const { name = "", handleChange = () => {}, label = "", type = "", value = "" } = props;

  // CONSTANTS USING LIBRARYS

  // CONSTANTS USING HOOKS

  // GENERAL CONSTANTS

  // USE EFFECT FUNCTION

  // REQUEST API FUNCTIONS

  // HANDLERS FUNCTIONS

  return (
    <div className="textInput-container">
      <label>{label}</label>
      <input name={name} onChange={(event) => handleChange(event)} type={type} value={value} />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Input;