import React, {Component} from 'react';

export default class Item extends Component {
    render() {
        return (
            <div className="pure-g list-of-items" onClick={() => this.props.handleClick(this.props.name)}>
                <div className="pure-u-2-24">
                    <img className="item" src={this.props.image} />
                </div>
                
                <div className="pure-u-6-24">
                    <p>{this.props.name.toUpperCase()}</p>
                </div>
                
                <div className="pure-u-15-24">
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}