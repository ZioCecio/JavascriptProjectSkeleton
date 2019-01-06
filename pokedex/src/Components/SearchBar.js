import React, { Component } from 'react';


/**
 * Classe che disegna il form per cercare un pokemon all'interno del pokedex
 */
export default class SearchBar extends Component {
    /**
     * Richiama la funzione per cercare il pokemon presente in App.js prendendo il nome del pokemon e passandolo come parametro
     * @param {Object} event - Informazioni relative all'evento scatenato dalla submit del form
     */
    handleSubmit = event => {
        event.preventDefault();

        this.props.search(document.getElementById("search").value);
        document.getElementById("search").value = "";
    }
    
    render() {
        return (
            <form className="search-pokemon" onSubmit={this.handleSubmit}>
                <input type="search" className="search-pokemon" id="search"/>
                <i className="fa fa-search" />
            </form>
        )
    }
}