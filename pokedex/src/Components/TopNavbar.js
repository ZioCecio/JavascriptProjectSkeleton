import React, { Component } from 'react';
import SearchBar from './SearchBar';


/**
 * Classe che disegna "lo spazio" colorato superiore
 * Qui è disegnata anche la barra per la ricerca dei pokemon nel pokedex
 */
export default class TopNavbar extends Component {
    render() {
        return (
            <div className="pure-g navbar-top">
                <div className="pure-u-1-3">
                </div>
                <div className="pure-u-1-3">
                </div>
                <div className="pure-u-1-3">
                    <SearchBar search={this.props.search}/>
                </div>
            </div>
        )
    }
}