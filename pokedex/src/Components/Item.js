import React, {Component} from 'react';

export default class Item extends Component {
    render() {
        return (
            <div className="pure-g">
                <div className="pure-u-2-24">
                    <img className="item" src={this.props.image} />
                </div>
                
                <div className="pure-u-6-24">
                    <p>{this.props.name.toUpperCase()}</p>
                </div>
                
                <div className="pure-u-16-24">
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}