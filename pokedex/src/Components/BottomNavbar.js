import React, { Component } from 'react';


/**
 * Classe che disegna "lo spazio" colorato inferiore
 */
export default class TopNavbar extends Component {
    render() {
        return (
            <div className="navbar-bottom center-element">
                <span className="who-made">Made with <i className="fas fa-heart" /> by Cecio, Maru & Pavo</span>
            </div>
        )
    }
}