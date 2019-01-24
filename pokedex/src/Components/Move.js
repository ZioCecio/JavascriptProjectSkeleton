import React, { Component } from 'react';


/**
 * Classe che disegna un div contenente le informazioni relative alla mossa del pokemon
 */
export default class Move extends Component {
  render() {
    return(
      <div className="max" onClick={() => this.props.handleClick(this.props.move)}>
        <p>{this.props.move}</p>
      </div>
    )
  }
}