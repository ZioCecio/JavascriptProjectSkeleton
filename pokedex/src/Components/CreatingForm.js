import React, { Component } from 'react';

export default class CreatingForm extends Component {
    render() {
        return(
            <div>
                <form className="pure-form">
                    <div className="pure-u-1-2">
                        Item: <input type="text" /> <br />
                        Moveset: <input type="text" />
                    </div>
                    <div className="pure-u-1-2">
                        EVS
                    </div>
                </form>
            </div>
        )
    }
}