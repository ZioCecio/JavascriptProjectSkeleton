import React, { Component } from 'react';


/**
 * Classe che disegna "lo spazio" colorato inferiore
 */
export default class TopNavbar extends Component {
    render() {
        return (
            <div className="navbar-bottom center-element">
                <span className="who-made">
                    Made with <i className="fas fa-heart" /> by Cecio, Maru & Pavo - <a href="https://github.com/ZioCecio/JavascriptProjectSkeleton" className="repository-git"><i className="fab fa-github"></i></a> 
                </span>
                <br/>
                <br/>
                <span className="who-made">
                    A special thanks to <a href="https://pokeapi.co/" className="repository-git">PokeAPI.co</a>
                </span>
            </div>
        )
    }
}