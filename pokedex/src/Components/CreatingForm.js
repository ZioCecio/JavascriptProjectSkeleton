import React, { Component } from 'react';

import Item from './Item';
import Ability from './Ability';
import Move from './Move';

export default class CreatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsList: this.props.itemsList,
            abilitiesList: this.props.abilitiesList,
            movesList: this.props.movesList,
            listToShow: null
        }

        this.clickedMoveText = 0;
    }

    clickItemText = () => {
        document.getElementById("item").style.backgroundColor = "white";

        this.setState({
            listToShow: this.items
        });
    }

    clickAbilityText = () => {
        document.getElementById("ability").style.backgroundColor = "white";

        this.setState({
            listToShow: this.abilities
        });
    }

    clickMoveText = id => {
        this.clickedMoveText = id;

        document.getElementById("move-" + id).style.backgroundColor = "white";

        this.typingMove();
    }

    clickItem = item => {
        document.getElementById("item").value = item;
    }

    clickAbility = ability => {
      document.getElementById("ability").value = ability;
    }

    clickMove = move => {
        document.getElementById("move-" + this.clickedMoveText).value = move;
    }

    getRightDescription = (language, textList) => {
        for(let i = 0; i < textList.length; i++) {
            if(textList[i].language.name.localeCompare(language) === 0) {
                return textList[i].text;
            }
                
        }
    }

    typingItem = () => {
        let search = document.getElementById("item").value;

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

        this.setState({
            listToShow: this.items
        });
    }

    typingMove = () => {
        let search = document.getElementById("move-" + this.clickedMoveText).value;

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

        this.setState({
            listToShow: this.moves
        });
    }

    onSubmit = event => {
        event.preventDefault();

        let itemText = document.getElementById("item");
        let abilityText = document.getElementById("ability");

        let allRight = true;

        let rightItem = false;
        let rightAbility = false;
        let rightMoveset = [false, false, false, false];

        let item = itemText.value.toLowerCase();
        let ability = abilityText.value;
        let moveset = [
            document.getElementById("move-1"),
            document.getElementById("move-2"),
            document.getElementById("move-3"),
            document.getElementById("move-4")
        ];

        this.state.itemsList.forEach(it => {
            if(it.name.localeCompare(item) === 0) {
                console.log(item);
                rightItem = true;
            }
        });
        this.state.abilitiesList.forEach(ab => {
            if(ab.ability.name.localeCompare(ability) === 0)
                rightAbility = true;
        });

        this.state.movesList.forEach(mov => {
            moveset.forEach((m, i) => {
                if(mov.move.name.localeCompare(m.value) === 0) {
                    rightMoveset[i] = true;
                }
            });
        });

        if(!rightItem) {
            itemText.style.backgroundColor = "pink";
            itemText.value = "";
        }

        if(!rightAbility) {
            abilityText.style.backgroundColor = "pink";
            abilityText.value = "";
        }

        for(let i = 0; i < rightMoveset.length; i++) {
            if(!rightMoveset[i]) {
                moveset[i].style.backgroundColor = "pink";
                moveset[i].value = "";
            }
        }

        

        console.log("BELLA");
    }

    componentDidMount() {
        for(let i = 0; i < this.state.itemsList.length; i++) {
            this.state.itemsList[i].rightDescription = this.getRightDescription("en", this.state.itemsList[i].flavor_text_entries);
        }

        this.items = this.state.itemsList.map((item, index) => {
            return (
                <li className="item-list" key={index}>
                    <Item name={item.name} image={item.sprites.default} description={item.rightDescription} handleClick={this.clickItem} />
                </li>
            )
        });

        this.abilities = this.state.abilitiesList.map((ability, index) => {
            return (
                <li className="item-list" key={index}>
                    <Ability ability={ability.ability.name} handleClick={this.clickAbility} />
                </li>
            )
        });

        this.move = this.state.movesList.map((move, index) => {
            return (
              <li className="item-list" key={index}>
                  <Move move={move.move.name} handleClick={this.clickMove} />
              </li>
            )
        });
    }

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
                        <h1>EVS</h1>
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