import React, { Component } from 'react';

import PokemonItemOfList from './PokemonItemOfList';


/**
 * Classe che disegna la lista di pokemon selezionati dall'utente
 */
export default class Team extends Component {
    /**
     * Disegna il componente
     * Viene eseguito ogni volta che cambia la lista di pokemon selezionati dall'utente
     */
    render() {
        //Per ogni pokemon nella lista disegna un componente
        const pokemon = this.props.selectedPokemons.map((pokemon, index) => {
            //Se non è presente il pokemon (null) scrive una stringa "vuota" senza immagine
            if(pokemon === null) {
                return (
                    <PokemonItemOfList name="- - - -" index={index} image={null} key={index} />
                )
            }

            return (
                <PokemonItemOfList name={pokemon.name} index={index} image={pokemon.image} onDelete={this.props.onDelete} key={index} />
            )

        });

        return(
            <div className="pure-g team-container">
                {pokemon}
            </div>
        )
    }
}