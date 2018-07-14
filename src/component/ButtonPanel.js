import Button from './Button';
import React from 'react';
import PropTypes from 'prop-types';

import './ButtonPanel.css';

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: []
    }
  }

  handleClick = (buttonName) => {
    this.props.clickHandler(buttonName);
  }

  render() {
    return (
      <div className="component-button-panel">
        { this.state.buttons }
      </div>
    );
  }

  componentDidMount() {
    const buttons = this.props.buttons.map((button) => {
      return <Button key={button.name} clickHandler={this.handleClick} {...button} />;
    });

    this.setState({ buttons });
  }
}
ButtonPanel.propTypes = {
  buttons: PropTypes.array,
  clickHandler: PropTypes.func,
};
export default ButtonPanel;
