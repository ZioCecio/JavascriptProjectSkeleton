import React, { Component } from 'react';

export default class CreatingForm extends Component {
    render() {
        return(
            <div className="container-select-form">
                <form className="pure-form">
                    <div className="pure-u-1-3">
                        <p>Item:</p>
                        <input type="text" className="pure-text select-form" /> <br/>
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
                    <ul>
                        
                    </ul>
                </div>

            </div>
        )
    }
}