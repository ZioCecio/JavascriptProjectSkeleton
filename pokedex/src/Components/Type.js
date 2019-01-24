import React, { Component } from 'react';


/**
 * Classe che disegna il rettangolo colorato che mostra il tipo passato come parametro
 */
export default class Type extends Component {
  render() {
    return (
      <div className={"pure-u-1-2 type " + this.props.type}>
          <p className="type">{this.props.type}</p>
      </div>
    )
  }
}