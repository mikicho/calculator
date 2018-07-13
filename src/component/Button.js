import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.name);
  }

  render() {
    
    const className = [
      "component-button",
      this.props.orange ? "orange" : "",
      this.props.wide ? "wide" : "",
    ];

    const style = {};
    if (this.props.color) {
      style.backgroundColor = this.props.color;
    }

    return (
      <div
        className={className.join(" ").trim()}
      >
        <button
          onClick={this.handleClick}
          style={style}
        >
          {this.props.name}
        </button>
      </div>
    );
  }
}
Button.propTypes = {
  name: PropTypes.string,
  orange: PropTypes.bool,
  color: PropTypes.string,
  wide: PropTypes.bool,
  clickHandler: PropTypes.func,
};
export default Button;
