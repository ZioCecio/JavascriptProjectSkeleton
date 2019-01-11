import React, { Component } from 'react';

import Item from './Item';
import Ability from './Ability';

export default class CreatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsList: this.props.itemsList,
            abilitiesList: this.props.abilitiesList,
            listToShow: null
        }
    }

    clickItemText = () => {
        this.setState({
            listToShow: this.items
        });
    }

    clickAbilityText = () => {
        this.setState({
            listToShow: this.abilities
        });
    }

    clickItem = (item) => {
        document.getElementById("item").value = item;
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

    

    componentDidMount() {
        for(let i = 0; i < this.state.itemsList.length; i++) {
            this.state.itemsList[i].rightDescription = this.getRightDescription("en", this.state.itemsList[i].flavor_text_entries);
        }

        this.items = this.state.itemsList.map((item, index) => {
            return (
                <li className="item-item-list" key={index}>
                    <Item name={item.name} image={item.sprites.default} description={item.rightDescription} handleClick={this.clickItem} />
                </li>
            )
        });

        this.abilities = this.state.abilitiesList.map((ability, index) => {
            return (
                <li className="ability-item-list" key={index}>
                    <Ability ability={ability.ability.name} />
                </li>
            )
        });
    }

    render() {
        return(
            <div className="container-select-form">
                <form className="pure-form">
                    <div className="pure-u-1-3">
                        <p>Item:</p>
                        <input id="item" type="text" className="pure-text select-form" onClick={this.clickItemText} onChange={this.typingItem} /> <br/>
                        <p>Ability:</p>
                        <input type="text" className="pure-text select-form" onClick={this.clickAbilityText} />
                    </div>
                    <div className="pure-u-1-3">
                        <p>Moveset</p>
                        <input type="text" className="pure-text moveset select-form" /> <br/>
                        <input type="text" className="pure-text moveset select-form" /> <br/>
                        <input type="text" className="pure-text moveset select-form" /> <br/>
                        <input type="text" className="pure-text moveset select-form" />
                    </div>
                    <div className="pure-u-1-3">
                        <h1>EVS</h1>
                    </div>
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