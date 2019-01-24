import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ComponentDisplayContext, {
  componentDisplayTypeClassNames
} from "../../contexts/ComponentDisplayContext";

import styles from "./styles.less";

const getCheckboxStyleClasses = props => ({
  [styles.primary]: props.primary,
  [styles.secondary]: props.secondary,
  [styles.disabled]: props.isDisabled
});

export default class Checkbox extends Component {
  static propTypes = {
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool,
    label: PropTypes.string,
    isDisabled: PropTypes.bool
  };

  static defaultProps = {
    primary: true,
    secondary: false,
    label: "",
    isChecked: false,
    isDisabled: false
  };

  renderCheckbox = displayType => {
    const { isChecked, isDisabled, onChange, label } = this.props;
    const commonClassName = {
      ...componentDisplayTypeClassNames(displayType, styles)
    };
    const checkboxClassName = classNames(
      styles.checkboxContainer,
      getCheckboxStyleClasses(this.props),
      commonClassName
    );

    return (
      <label
        className={checkboxClassName}
        disabled={isDisabled}
        onClick={e => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onChange}
        />
        <span className={styles.checkmark} />
        {label}
      </label>
    );
  };

  render() {
    return (
      <ComponentDisplayContext.Consumer>
        {displayType => this.renderCheckbox(displayType)}
      </ComponentDisplayContext.Consumer>
    );
  }
}
