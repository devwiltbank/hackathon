import React, { Component } from 'react';

export class Added extends Component {
    constructor(props) {
        super(props); 
        this.state = '';
    }

    render () {
        if(this.props.targetPrice) {
            var httpResponse = this.props.phone;
            return (
                <div className='alert alert-secondary'>
                    <div>Alert has been Set</div>
                    <div>Keep this window open and a text will be sent to {this.props.phone} after the target price of ${this.props.targetPrice} is reached.
                         (We'll also send a text immediately, to confirm it's working.)
                    </div>
                    <div>Response: {httpResponse}</div>
                </div>
            );
        }
        else return null;
    }
}
