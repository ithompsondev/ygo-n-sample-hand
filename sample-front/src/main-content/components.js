import React, { Fragment } from 'react';
import { InstructionJumbotronSection } from '../jumbotron/jumbotron.js';
import { DeckListFormSection } from '../form/form.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class CreateDeck extends React.Component {
    render() {
        return (
            <div className='row align-items-center p-5'>
                <InstructionJumbotronSection instruction=
                    {
                        {
                            deckName: 'Enter deck name',
                            cardList: 'Enter card name and number'
                        }
                    }
                />
                <DeckListFormSection handler={this.props.handler}/>
            </div>
        );
    }
}