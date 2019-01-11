import React, { Component } from 'react';

export default class Ability extends Component {
    render() {
        return (
            <div>
                <p>{this.props.ability}</p>
            </div>
        )
    }
}