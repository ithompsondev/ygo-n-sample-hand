import React from 'react';
import { ReturnOption } from '../deck/components.js';
import { ResampleButton,SampleSection } from './components.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class SampleViewerPage extends React.Component {
    render() {
        return (
            <div className='row align-items-center'>
                <ReturnOption handler={this.props.deck.createdHandler} />
                <div className='col-md-4'></div>
                <ResampleButton handler={this.props.deck.sampleHandler}/>
                <SampleSection deck={this.props.deck.deck} />
                <ReturnOption handler={this.props.deck.createdHandler} />
                <div className='col-md-4'></div>
                <ResampleButton handler={this.props.deck.sampleHandler}/>
            </div>
        );
    }
}