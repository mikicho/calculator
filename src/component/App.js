import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import './App.css';
import { connect } from 'react-redux'
import { calculate, calculatorLoaded } from '../actions/calculator'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types';

export class App extends React.Component {
  handleClick = (buttonName) => {
    this.props.calculate(buttonName);
  }
  render() {
    const { total, next } = this.props;
    return (
      <div className="component-app">
        <Display
          value={next || total || '0'}
        />
        <ButtonPanel
          clickHandler={this.handleClick}
          buttons={this.props.buttons}
        />
      </div>
    );
  }
}
const mapState = state => ({
  total: state.calculator.total,
  next: state.calculator.next,
})

App.propTypes = {
  buttons: PropTypes.array,
};

export default hot(module)(connect(mapState, { calculate, calculatorLoaded })(App))
