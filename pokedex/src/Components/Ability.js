import React, { Component } from 'react';

export default class Ability extends Component {
    render() {
        return (
            <div className="max" onClick={() => this.props.handleClick(this.props.ability)}>
                <p>{this.props.ability}</p>
            </div>
        )
    }
}