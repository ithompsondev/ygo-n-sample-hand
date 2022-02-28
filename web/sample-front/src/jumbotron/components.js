import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class TextJumbotron extends React.Component {
    render() {
        return (
            <div className='jumbotron'>
                <h2 className='stroke-warning'><b>{this.props.instruction}</b></h2>
            </div>
        );
    }
}