import React, { Component } from 'react';
import './App.css';

import TopNavbar from './Components/TopNavbar';
import BottomNavbar from './Components/BottomNavbar';

import Team from './Components/Team';
import CreatingForm from './Components/CreatingForm';
import Type from './Components/Type';


/**
 * Classe che disegna tutta la pagina e gestisce l'applicazione
 * @param {Object} state - Oggetto nel quale sono definite le variabili utili a disegnare la pagina
 * @param {Object[]} state.pokemonList - Lista di pokemon
 * @param {Object[]} state.pokemonSpeciesList - Altra lista di pokemon con informazioni differenti alla precedente
 * @param {Object[]} state.itemsList . Lista di oggetti
 * @param {Object[]} state.selectedPokemons - Lista di pokemon scelti dall'utente
 * @param {number} state.selectedIndex - Indice "puntatore" per muoversi nella lista di pokemon
 * @param {boolean} state.clicked - Indica quando è stato premuto il bottone per aggiungere un pokemon alla squadra (quindi quando è necessario visualizzare il form)
 * 
 * @param {boolean} pressed - Gestisce il timer che impedisce all'utente di scorrere le pagine del pokedex in maniera troppo rapida
 */
class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemonList: [],
      pokemonSpeciesList: [],
      itemsList: [],
      selectedPokemons: [null, null, null, null, null, null],
      selectedIndex: 0,
      clicked: false
    }

    this.pressed = false;
  }


  /**
   * Prende i dati relativi ai pokemon
   * @param {Object[]} pokemons - Lista che contiene i nomi dei pokemon necessari per fare la richiesta al server
   * 
   * @returns {Object[]} Lista di pokemon
   */
  getPokemonList = async (pokemons) => {
    let promises = [];  //Lista di promesse

    //Per ogni pokemon esegue una fetch per prendere i dati
    pokemons.forEach(p => {
      promises.push(
        fetch("https://pokeapi.co/api/v2/pokemon/" + p.pokemon_species.name + "/")
          .then(p => p.json())
        );
    });

    const result = await Promise.all(promises); //Risolve le promise (si attende che tutte le richieste siano soddisfatte prima di ritornare i risultati) e salva i risultati in una variabile
    return result;
  }


  /**
   * Prende alcuni dati relativi ai pokemon
   * @param {Object[]} pokemons - Lista contentente gli url usati per fare la richiesta
   * 
   * @returns {Object[]} Lista di pokemon
   */
  getPokemonSpeciesList = async (pokemons) => {
    let promises = [];  //Lista di promesse

    //Per ogni pokemon esegue una fetch per prendere i dati
    pokemons.forEach(p => {
      promises.push(
        fetch(p.pokemon_species.url)
          .then(p => p.json())
        );
    });

    const result = await Promise.all(promises); //Risolve le promise (si attende che tutte le richieste siano soddisfatte prima di ritornare i risultati) e salva i risultati in una variabile
    return result;
  }


  /**
   * Prende i dati relativi agli oggetti
   * @param {Object[]} items - Lista contenente gli url per fare la richiesta
   * 
   * @returns {Object[]} - Lista di oggetti
   */
  getItemsList = async (items) => {
    let promises = [];  //Lista di promesse

    //Per ogni oggetto esegue una fetch per prendere i dati
    items.forEach(i => {
      promises.push(
        fetch(i.url)
          .then(p => p.json())
        );
    });

    const result = await Promise.all(promises); //Risolve le promise (si attende che tutte le richieste siano soddisfatte prima di ritornare i risultati) e salva i risultati in una variabile
    return result;
  }


  /**
   * Cerca il pokemon in base al nome e mostra le sue informazioni a schermo aggiornando lo stato dell'applicaizone
   * @param {string} name - Nome del pokemon da cercare
   */
  searchPokemon = name => {
    let {pokemonList} = this.state; //Lista di pokemon

    //Scorre tutta la lista di pokemon
    for(let i = 0; i < pokemonList.length; i++) {
      //Se trova il pokemon specificato aggiorna lo stato modificando l'indice che "punta" al pokemon all'interno della lista
      if(pokemonList[i].name.toLowerCase().localeCompare(name.toLowerCase()) === 0) {
        this.setState({
          selectedIndex: i
        });
      }
    }
  }


  /**
   * Scorre il pokedex (lista di pokemon)
   * @param {number} direction - Indica in quale direzione scorrere la lista(+1 va avanti, -1 torna indietro)
   */
  changePokemon = direction => {
    //Impedisce che si scorra la lista troppo velocemente
    if(this.pressed)
      return;

    let {selectedIndex} = this.state; //Indice "puntatore"

    //Impedisce che il "puntatore" esca dai margini della lista
    if(selectedIndex + direction > this.state.pokemonList.length - 1 || selectedIndex + direction < 0)
      return;

    //Cambia lo stato con il nuovo indice
    this.setState({
      selectedIndex: selectedIndex + direction
    });

    this.pressed = true;
    setTimeout(() => this.pressed = false, 300);  //Timeout che per 300 millisecondi impedisce di cambiare pokemon
  }


  /**
   * Controlla quale tasto è stato premuto per scorrere la lista di pokemon
   * @param {Object} event - Informazioni relative all'evento scatenato dalla pressione di un tasto
   */
  handleKeyDown = event => {
    if(event.keyCode === 40)
      this.changePokemon(1);
    
    if(event.keyCode === 38)
      this.changePokemon(-1);
  }


  /**
   * Trova la descrizione giusta in base alla lingua selezionata
   * @param {string} language - Lingua che deve essere la descrizione
   * 
   * @returns {string} Descrizione del pokemon
   */
  getRightDescription = language => {
    let rightIndex = 1; //Indice che specifica in quale posizione della lista di lingue si trova quella selezionata
    let p = this.state.pokemonSpeciesList[this.state.selectedIndex];  //Pokemon selezionato

    //Scorre la lista di lingue fino a trovare quella giusta per poi salvare in quale posizione si trova
    for(let i = 0; i < p.flavor_text_entries.length; i++) {
      if(p.flavor_text_entries[i].language.name.localeCompare(language) === 0)
        rightIndex = i;
    } 

    return p.flavor_text_entries[rightIndex].flavor_text;
  }


  /**
   * Aggiunge il pokemon al momento selezionato alla lista di pokemon scelti dall'utente
   */
  addPokemon = () => {
    const name = this.state.pokemonList[this.state.selectedIndex].name; //Nome del pokemon selezionato
    const image = this.state.pokemonList[this.state.selectedIndex].sprites.front_default; //Sprite del pokemon selezionato

    //Oggetto pokemon nel quale sono specificati il suo nome e la sua sprite
    const pokemon = {
      name,
      image
    };

    let {selectedPokemons} = this.state;  //Lista di pokemon scelti dall'utente

    //Scorre tutta la lista di pokemon scelti dall'utente per mettere in coda quello selezionato al momento dell'aggiunta
    for(let i = 0; i < selectedPokemons.length; i++) {
      if(selectedPokemons[i] === null) {
        selectedPokemons[i] = pokemon;
        break;
      }
    }

    //Aggiorna la lista di pokemon scelti dall'utente
    this.setState({
      selectedPokemons: selectedPokemons,
      clicked: false
    });
  }


  /**
   * Elimina un pokemon dalla lista di pokemon scelti dall'utente
   * @param {number} index - Indice che indica in quale posizione della lista si trova il pokemon da eliminare
   */
  deletePokemon = index => {
    const {selectedPokemons} = this.state;  //Lista di pokemon scelti dall'utente
    selectedPokemons[index] = null; //Elimina il pokemon dalla lista
    selectedPokemons.sort((a, b) => ((a === null && b === null) || (a !== null && b !== null)) ? 0 : (a === null) ? 1 : -1);  //Ordina la lista mettendo in coda i null

    //Aggiorna la lista di pokemon scelti dall'utente
    this.setState({
      selectedPokemons: selectedPokemons
    });
  }


  /**
   * Cambia lo stato ogni volta che il bottone per aggiungere il pokemon alla squadra viene cliccato
   */
  clickAdd = () => {
    this.setState({
      clicked: true
    });
  }


  /**
   * Chiamata automaticamente non appena il componente viene "montato" sulla pagina
   * Viene eseguito subito dopo il render
   */
  componentDidMount() {
    //Aggiunge alla pagina un listener che richiama la funzione passata come parametro ogni volta che viene premuto un pulsante della tastiera
    document.addEventListener("keydown", this.handleKeyDown.bind(this));

    //Richiesta al server per "ottenere" il pokedex
    fetch("https://pokeapi.co/api/v2/pokedex/kanto/")
    .then(result => result.json())

    .then(pokedex => {
        let pokemons = pokedex.pokemon_entries; //Lista di pokemon dove sono indicati solo il nome e un url per accedere ad altri dati

        //Ottiene la lista di dati relativi ai pokemon...
        this.getPokemonList(pokemons)
          .then(a => {
            //...e aggiorna lo stato con la lista piena
            this.setState({
              pokemonList: a
            });
          });

        //Ottiene la lista di dati relativi ai pokemon...
        this.getPokemonSpeciesList(pokemons)
        .then(a => {
          //...e aggiorna lo stato con la lista piena
          this.setState({
            pokemonSpeciesList: a
          });
        });
    });

    //Richiesta al server per "ottenere" gli oggetti
    fetch("https://pokeapi.co/api/v2/item/")
    .then(result => result.json())

    .then(items => {
      //Ottiene la lista di oggetti...
      this.getItemsList(items.results)
      .then(a => {
        //...e aggiorna lo stato con la lista piena
        this.setState({
          itemsList: a
        });
      });
    });
  }


  /**
   * Disegna la pagina
   * Viene eseguita ogni volta che lo stato è aggiornato ridisegnando la pagina e i componenti
   */
  render() {
    //Se la lista di pokemon non è ancora stata riempita fa visualizzare un caricamento
    if(this.state.pokemonList.length <= 0 || this.state.itemsList.length <= 0)
      return (<p>BOYYY</p>);

    //Per ogni tipo che posside un pokemon crea un nuovo componente per mostarlo
    const types = this.state.pokemonList[this.state.selectedIndex].types.map((item, index) => {
      return(
        <Type type={item.type.name} key={index} />
      )
    });

    //Nella variabile viene salvato l'elemento che è neccessario venga disegnato (o la descrizione del pokemon o il form per aggiungerlo alla squadra)
    let bomber = (<div className="description">
                    <p className="description">{this.getRightDescription("en")}</p>
                  </div>);
    //Nella variabile viene salvato il bottone per aggiungere il pokemon alla squadra
    let addButton = (<i className="far fa-plus-square add-button" onClick={this.clickAdd} />);

    //Se il bottone è già stato premuto allora verra visualizzato il form per inserire i dati e il bottone per aggiungere il pokemon alla squadra
    if(this.state.clicked) {
      bomber = <CreatingForm itemsList={this.state.itemsList} abilitiesList={this.state.pokemonList[this.state.selectedIndex].abilities} movesList={this.state.pokemonList[this.state.selectedIndex].moves} />;
      addButton = (<i className="far fa-check-square add-button" onClick={() => document.getElementById("submit-button").click()} />);
    }

    return (
      <div className="container">
        
        <TopNavbar search={this.searchPokemon}/>

        <div className="pure-g divider">
          <div className="pure-u-2-5" />
          <div className="pure-u-3-5 center-element">
            <img className="triangle-up" src="https://cdn.shopify.com/s/files/1/0253/8243/products/Mildmay_Grey_Rubber_Triangle_Tiles_large.png?v=1522237355" onClick={() => this.changePokemon(-1)} />
          </div>
        </div>

        <div className="pure-g body">

          <div className="pure-u-1-2 center-element">
            <img src={this.state.pokemonList[this.state.selectedIndex].sprites.front_default} className="pokemon-image"/>
            <br />
            {addButton}
          </div>
          
          <div className="pure-u-1-2 eskeuro">

            <div className="pure-g">
              <div className="pure-u-1-2">
                <h1 className="info-container">
                  {"#" + (this.state.selectedIndex + 1) + " " + this.state.pokemonList[this.state.selectedIndex].name.toUpperCase()}
                </h1>

                <h1>{this.state.pokemonSpeciesList[this.state.selectedIndex].shape.name.charAt(0).toUpperCase() + this.state.pokemonSpeciesList[this.state.selectedIndex].shape.name.slice(1) + " pokemon"}</h1>
              
                <div>{types}</div>
              </div>
              <div className="pure-u-1-2">
                <Team selectedPokemons={this.state.selectedPokemons} onDelete={this.deletePokemon}/>
              </div>
            </div>

            {bomber}

          </div>
        </div>

        <div className="pure-g divider">
          <div className="pure-u-2-5" />
          <div className="pure-u-3-5 center-element">
            <img className="triangle-down" src="https://cdn.shopify.com/s/files/1/0253/8243/products/Mildmay_Grey_Rubber_Triangle_Tiles_large.png?v=1522237355" onClick={() => this.changePokemon(1)} />
          </div>
        </div>

        <BottomNavbar />
        
      </div>
    )
  }
}

export default App;
