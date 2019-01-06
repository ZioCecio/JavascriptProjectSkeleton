import React, { Component } from 'react';


/**
 * Classe che disegna un elemento della lista di pokemon selezionati dall'utente
 */
export default class PokemonItemOfList extends Component {
    /**
     * Disegna il componente
     * Viene eseguito ogni volta che cambia la lista di pokemon selezionati dall'utente
     */
    render() {
        let image = null;
        let button = null;

        //Se è presente l'immagine vuol dire che è necessario disegnarla insieme al bottone per l'eliminazione
        //Se non è presente l'immagine (settata a null) nè l'immagine nè il bottone verranno disegnati
        if(this.props.image !== null) {
            image = <img className="small-image" src={this.props.image} />;
            button = <button className="pure-button delete-list" onClick={() => this.props.onDelete(this.props.index)}>
                        <i class="far fa-trash-alt"></i>
                    </button>;
        }

        return (
            <div className="pure-u-1-2 center-element" key={this.props.index}>
                <div className="pure-g">
                    <div className="pure-u-1-3">
                        {image}
                    </div>
                    <div className="pure-u-1-3">
                        <p className="pokemon-name-list">{this.props.name}</p>
                    </div>
                    <div className="pure-u-1-3">
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}