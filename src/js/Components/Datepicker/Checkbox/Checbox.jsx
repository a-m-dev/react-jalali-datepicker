import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const Checkbox = ({ label, ...checkboxProps }) => {
  return (
    <div className="exclude-check">
      <input type="checkbox" name="checkbox" {...checkboxProps} />
      <span>{label}</span>
    </div>
  );
};

Checkbox.defaultProps = {
  checked: false,
  label: "",
  onChange: (e) => {
    console.log(e);
  },
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default Checkbox;
