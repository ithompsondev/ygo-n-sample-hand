import React from 'react';
import { DeckListViewer,ReturnOption } from './components.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class DeckListViewerPage extends React.Component {
    render() {
        return (
            <div className='row align-items-center text-center'>
                <DeckListViewer deck={{name: this.props.deck.deckName,deck: this.props.deck.deck}} />
                <ReturnOption handler={this.props.deck.handler}/>
            </div>
        );
    }
}