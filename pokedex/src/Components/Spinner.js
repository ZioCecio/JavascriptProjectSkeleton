import React, { Component } from 'react';


/**
 * Classe che disegna uno spinner
 * Usata per "raccogliere" gli evs (punti forza) selezionati dall'utente
 */
export default class Spinner extends Component {
    render() {
        return(
            <div className="pure-g spinner-container">
                <div className="pure-u-1-5 center-element">
                    <p className="spinner-name">{this.props.name}</p>
                </div>
                <div className="pure-u-3-5">
                    <input className="range select-form" id={this.props.name} type="range" min="0" max="252" step="4" onChange={() => this.props.usingSpinner(this.props.name)} defaultValue={this.props.evs} />
                </div>
                <div className="pure-u-1-5 center-element">
                    <p className="spinner-name">{this.props.evs}</p>
                </div>
            </div>
        )
    }
}