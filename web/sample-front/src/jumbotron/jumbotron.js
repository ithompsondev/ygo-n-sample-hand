import React, { Fragment } from 'react';
import { TextJumbotron } from './components.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class InstructionJumbotronSection extends React.Component {
    render() {
        const deckName = 'Enter a deckname';
        const cardList = 'Enter card name and number';
        return (
            <div className='col-md-7 text-left'>
                <TextJumbotron instruction={this.props.instruction.deckName} />
                <TextJumbotron instruction={this.props.instruction.cardList} />
            </div>
        );
    }
}