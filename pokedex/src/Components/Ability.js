import React, { Component } from 'react';


/**
 * Classe che disegna un div contenente le informazioni relative all'abilità del pokemon
 */
export default class Ability extends Component {
    render() {
        return (
            <div className="max" onClick={() => this.props.handleClick(this.props.ability)}>
                <p>{this.props.ability}</p>
            </div>
        )
    }
}