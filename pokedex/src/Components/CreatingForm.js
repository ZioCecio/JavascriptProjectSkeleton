import React, { Component } from 'react';

import Item from './Item';

export default class CreatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsList: this.props.itemsList,
            listToShow: null
        }
    }

    itemClick = () => {
        this.setState({
            listToShow: this.items
        })
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
        console.log(search);

        this.items = this.state.itemsList.map((item, index) => {
            if(item.name.startsWith(search)) {
                return (
                    <li className="item-item-list" key={index}>
                        <Item name={item.name} image={item.sprites.default} description={this.getRightDescription("en", item.flavor_text_entries)} />
                    </li>
                )
            }
        });

        this.setState({
            listToShow: this.items
        });
    }

    componentDidMount() {
        this.items = this.state.itemsList.map((item, index) => {
            return (
                <li className="item-item-list" key={index}>
                    <Item name={item.name} image={item.sprites.default} description={this.getRightDescription("en", item.flavor_text_entries)} />
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
                        <input id="item" type="text" className="pure-text select-form" onClick={this.itemClick} onChange={this.typingItem} /> <br/>
                        <p>Ability:</p>
                        <input type="text" className="pure-text select-form" />
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