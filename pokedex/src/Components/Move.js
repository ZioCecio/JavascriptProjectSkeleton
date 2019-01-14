import React, { Component } from 'react';

export default class Move extends Component {
  render() {
    return(
      <div className="max" onClick={() => this.props.handleClick(this.props.move)}>
        <p>{this.props.move}</p>
      </div>
    )
  }
}