import React, { Component } from 'react';

import Item from './Item';
import Ability from './Ability';
import Move from './Move';

import Spinner from './Spinner';


/**
 * Classe che disegna il form per raccogliere le informazioni relative al pokemon che l'utente desidera aggiungere in squadra
 * @param {Object} state - Oggetto nel quale sono definite le variabili utili a disegnare il form
 * @param {Object[]} state.itemsList - Lista di oggetti che possono essere assegnati al pokemon da far selezionare all'utente
 * @param {Object[]} state.abilitiesList - Lista di abilità che un pokemon può avere da far selezionare all'utente
 * @param {Object[]} state.abilitiesList - Lista di mosse che un pokemon può compiere da far selezionare all'utente
 * @param {Object} state.listToShow - Contiene il jsx per disegnare la lista corretta
 * @param {number} state.maxEvs - Indica il numero massimo di evs (punti forza) che è possibile assegnare ad un sigolo pokemon
 * @param {number[]} state.totalEvs - Lista che contiene il numero di evs (punti forza) assegnati ad ogni caratteristica di combattimento (HP, Atk, Def, SAtk, SDef, Spd)
 * 
 * @param {number} clickMoveText - Numero che indica su quale textfield l'utente sta scrivendo la mossa da assegnare al pokemon
 */
export default class CreatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsList: this.props.itemsList,
            abilitiesList: this.props.abilitiesList,
            movesList: this.props.movesList,
            listToShow: null,
            maxEvs: 508,
            totalEvs: []
        }

        this.clickedMoveText = 0;

        this.state.totalEvs["HP"] = 0;
        this.state.totalEvs["Atk"] = 0;
        this.state.totalEvs["Def"] = 0;
        this.state.totalEvs["SAtk"] = 0;
        this.state.totalEvs["SDef"] = 0;
        this.state.totalEvs["Spd"] = 0;
    }


    /**
     * Viene chiamata quando il textfield per l'inserimento dell'oggetto viene cliccato
     * Setta il background bianco e mostra la lista di oggetti per aiutare l'utente nella scelta
     */
    clickItemText = () => {
        document.getElementById("item").style.backgroundColor = "white";

        this.setState({
            listToShow: this.items
        });
    }


    /**
     * Viene chiamata quando il textfield per l'inserimento dell'abilità viene cliccato
     * Setta il background bianco e mostra la lista di abilità per aiutare l'utente nella scelta
     */
    clickAbilityText = () => {
        document.getElementById("ability").style.backgroundColor = "white";

        this.setState({
            listToShow: this.abilities
        });
    }


    /**
     * Viene chiamata quando uno dei textfield per l'inserimento delle mosse viene cliccato
     * Setta il background bianco e mostra la lista di mosse per aiutare l'utente nella scelta
     * Setta anche l'id del textfield cliccato per fare in modo che i controlli vengano eseguiti sul textfield giusto
     * 
     * @param {number} id - Indica l'id del textfield cliccato
     */
    clickMoveText = id => {
        this.clickedMoveText = id;

        document.getElementById("move-" + id).style.backgroundColor = "white";

        this.typingMove();
    }


    /**
     * Viene chiamata quando un oggetto della lista mostrata viene cliccato
     * 
     * @param {string} item - Indica il nome dell'oggetto che è stato cliccato
     */
    clickItem = item => {
        document.getElementById("item").value = item;
    }


    /**
     * Viene chiamata quando un abilità della lista mostrata viene cliccata
     * 
     * @param {string} ability - Indica il nome dell'abilità che viene cliccata
     */
    clickAbility = ability => {
      document.getElementById("ability").value = ability;
    }


    /**
     * Viene chiamata quando una mossa della lista mostrata viene cliccata
     * 
     * @param {string} move - Indica il nome della mossa che è stata cliccata
     */
    clickMove = move => {
        document.getElementById("move-" + this.clickedMoveText).value = move;
    }


    /**
     * Trova la descrizione relativa all'oggetto da mostare nell lingua passata come parametro
     * 
     * @param {string} language - Indica la lingua desiderata
     * @param {Object[]} textList - Lista nella quale sono contenute le descrizioni nelle varie lingue
     * 
     * @returns {string} Descrizione corretta nella lingua desiderata
     */
    getRightDescription = (language, textList) => {
        for(let i = 0; i < textList.length; i++) {
            if(textList[i].language.name.localeCompare(language) === 0) {
                return textList[i].text;
            }
                
        }
    }


    /**
     * Viene chiamata ogni volta che l'utente scrive nel textfield degli oggetti
     */
    typingItem = () => {
        //Prende il valore momentaneo
        let search = document.getElementById("item").value;

        //Crea una lista contente tutti gli oggetti con il nome che inizia con il valore momentaneamente presente nel textfield
        this.items = this.state.itemsList.map((item, index) => {
            if(item.name.startsWith(search)) {
                return (
                    <li className="item-item-list" key={index}>
                        <Item name={item.name} image={item.sprites.default} description={item.rightDescription} handleClick={this.clickItem} />
                    </li>
                )
            }
            return;
        });

        //Mostra la nuova lista con gli oggetti filtrati
        this.setState({
            listToShow: this.items
        });
    }


    /**
     * Viene chiamata ogni volta che l'utente scrive in una textfield deglle mosse
     */
    typingMove = () => {
        //Prende il valore momentaneo
        let search = document.getElementById("move-" + this.clickedMoveText).value;

        //Crea una lista contente tutte le mosse con il nome che inizia con il valore momentaneamente presente nel textfield
        this.moves = this.state.movesList.map((move, index) => {
            if(move.move.name.startsWith(search)) {
                return (
                    <li className="item-list" key={index}>
                        <Move move={move.move.name} handleClick={this.clickMove} />
                    </li>
                )
            }
            return;
        });

        //Mostra la nuova lista con gli oggetti filtrati
        this.setState({
            listToShow: this.moves
        });
    }


    /**
     * Conta il numero di evs (punti forza) che sono stati inseriti dall'utente (nel momento in cui questa viene chiamata)
     * 
     * @returns {number} Il numero di evs (punti forza) inseriti dall'utente
     */
    calculateUsedEvs = () => {
        //Prende tutti gli spinner per leggerne i valori
        let ranges = document.getElementsByClassName("range");

        //Scorre tutti gli spinner leggendone i valori e contandoli
        let cont = 0;
        for(let i = 0; i < ranges.length; i++)
            cont += Number(ranges[i].value);

        return cont;
    }


    /**
     * Viene chiamata ogni volta che uno spinner viene usato dall'utente
     * 
     * @param {string} who - Il nome dello spinner che ha richiamato la funzione
     */
    usingSpinner = who => {
        //Prende il valore momentaneamente inserito dall'utente e del numero degli evs (punti forza) assegnati fino ad'ora
        let value = document.getElementById(who).value;
        let evs = this.state.totalEvs;

        //Se il numero di evs assegnati è più piccolo del massimo numero assegnabile permette l'assegnazione altrimenti la blocca
        if(this.calculateUsedEvs() <= this.state.maxEvs)
            evs[who] = value;
        else
            document.getElementById(who).value = evs[who];

        //Aggiorna lo stato con il nuovo numero di evs (punti forza)
        this.setState({
            totalEvs: evs
        });
    }


    /**
     * Viene chiamata quando viene cliccato il bottone di submit
     * 
     * @param {Object} event - Oggetto contenente le informazioni relative all'evento che ha richiamato la funzione
     */
    onSubmit = event => {
        //Impedisce di fare richieste GET verso l'esterno della pagina
        event.preventDefault();
        
        //Definisce le variabili utili a verificare che gli input non siano errati
        let allRight = true;
        let rightItem = false;
        let rightAbility = false;
        let rightMoveset = [false, false, false, false];

        //Prende tutti i dati inseriti nel form
        let itemText = document.getElementById("item");
        let abilityText = document.getElementById("ability");
        let item = itemText.value.toLowerCase();
        let ability = abilityText.value;
        let moveset = [
            document.getElementById("move-1"),
            document.getElementById("move-2"),
            document.getElementById("move-3"),
            document.getElementById("move-4")
        ];

        //Controlla che l'oggetto selezionato esista
        this.state.itemsList.forEach(it => {
            if(it.name.localeCompare(item) === 0) {
                rightItem = true;
            }
        });

        //Controlla che l'abilità selezionata esista
        this.state.abilitiesList.forEach(ab => {
            if(ab.ability.name.localeCompare(ability) === 0)
                rightAbility = true;
        });

        //Controlla che le mosse selezionate esistano
        this.state.movesList.forEach(mov => {
            moveset.forEach((m, i) => {
                if(mov.move.name.localeCompare(m.value) === 0) {
                    rightMoveset[i] = true;
                }
            });
        });


        /**
         * Esegue una serie di controlli per settare il background con il colore rosa di tutti i textfield nei quali è stato inserito un input errato o non esistente
         */
        if(!rightItem) {
            itemText.style.backgroundColor = "pink";
            itemText.value = "";
            allRight = false;
        }

        if(!rightAbility) {
            abilityText.style.backgroundColor = "pink";
            abilityText.value = "";
            allRight = false;
        }

        for(let i = 0; i < rightMoveset.length; i++) {
            if(!rightMoveset[i]) {
                moveset[i].style.backgroundColor = "pink";
                moveset[i].value = "";
                allRight = false;
            }
        }

        //Se tutti gli input dell'utente sono corretti allora aggiunge il pokemon alla lista
        if(allRight) {
            this.props.addPokemon({
                item: item,
                ability: ability,
                moveset: [
                    moveset[0].value,
                    moveset[1].value,
                    moveset[2].value,
                    moveset[3].value
                ],
                evs: this.state.totalEvs
            });
        }
    }


    /**
    * Chiamata automaticamente non appena il componente viene "montato" sulla pagina
    * Viene eseguito subito dopo il render
    */
    componentDidMount() {
        //Ottiene tutte le descrizioni relative agli oggetti nella lingua corretta (inglese)
        for(let i = 0; i < this.state.itemsList.length; i++) {
            this.state.itemsList[i].rightDescription = this.getRightDescription("en", this.state.itemsList[i].flavor_text_entries);
        }

        //Crea la variabile contenente il jsx utile a disegnare la lista di oggetti
        this.items = this.state.itemsList.map((item, index) => {
            return (
                <li className="item-list" key={index}>
                    <Item name={item.name} image={item.sprites.default} description={item.rightDescription} handleClick={this.clickItem} />
                </li>
            )
        });

        //Crea la variabile contenente il jsx utile a disegnare la lista di abilità
        this.abilities = this.state.abilitiesList.map((ability, index) => {
            return (
                <li className="item-list" key={index}>
                    <Ability ability={ability.ability.name} handleClick={this.clickAbility} />
                </li>
            )
        });

        //Crea la variabile contenente il jsx utile a disegnare la lista di mosse
        this.move = this.state.movesList.map((move, index) => {
            return (
              <li className="item-list" key={index}>
                  <Move move={move.move.name} handleClick={this.clickMove} />
              </li>
            )
        });
    }


    /**
    * Disegna la pagina
    * Viene eseguita ogni volta che lo stato è aggiornato ridisegnando la pagina e i componenti
    */
    render() {
        return(
            <div className="container-select-form">
                <form id="myForm" className="pure-form" onSubmit={this.onSubmit}>
                    <div className="pure-u-1-3">
                        <p>Item:</p>
                        <input id="item" type="text" className="pure-text select-form" onClick={this.clickItemText} onChange={this.typingItem} /> <br/>
                        <p>Ability:</p>
                        <input id="ability" type="text" className="pure-text select-form" onClick={this.clickAbilityText} readOnly />
                    </div>
                    <div className="pure-u-1-3">
                        <p>Moveset</p>
                        <input id="move-1" type="text" className="pure-text moveset select-form" onClick={() => this.clickMoveText(1)} onChange = {this.typingMove} /> <br/>
                        <input id="move-2" type="text" className="pure-text moveset select-form" onClick={() => this.clickMoveText(2)} onChange = {this.typingMove} /> <br/>
                        <input id="move-3" type="text" className="pure-text moveset select-form" onClick={() => this.clickMoveText(3)} onChange = {this.typingMove} /> <br/>
                        <input id="move-4" type="text" className="pure-text moveset select-form" onClick={() => this.clickMoveText(4)} onChange = {this.typingMove} />
                    </div>
                    <div className="pure-u-1-3">
                        <Spinner name="HP" evs={this.state.totalEvs["HP"]} usingSpinner={this.usingSpinner} />
                        <Spinner name="Atk" evs={this.state.totalEvs["Atk"]} usingSpinner={this.usingSpinner} />
                        <Spinner name="Def" evs={this.state.totalEvs["Def"]} usingSpinner={this.usingSpinner} />
                        <Spinner name="SAtk" evs={this.state.totalEvs["SAtk"]} usingSpinner={this.usingSpinner} />
                        <Spinner name="SDef" evs={this.state.totalEvs["SDef"]} usingSpinner={this.usingSpinner} />
                        <Spinner name="Spd" evs={this.state.totalEvs["Spd"]} usingSpinner={this.usingSpinner} />
                    </div>

                    <button id="submit-button" type="submit" hidden />
                </form>

                <div className="pure-u-1 select">
                    <ul className="list">
                        {this.state.listToShow}
                    </ul>
                </div>

            </div>
        )
    }
}