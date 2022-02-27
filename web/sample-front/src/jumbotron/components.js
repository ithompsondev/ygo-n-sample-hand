import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class TextJumbotron extends React.Component {
    render() {
        return (
            <div className='jumbotron'>
                <h3>{this.props.instruction}</h3>
            </div>
        );
    }
}