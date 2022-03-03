import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class TextJumbotron extends React.Component {
    render() {
        return (
            <div className='jumbotron'>
                <h1 className='red black-stroke'><b>{this.props.instruction}</b></h1>
            </div>
        );
    }
}