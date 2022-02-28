import React, { Fragment } from 'react';
import { Button,DeckNameInput,DeckListTextArea } from './components.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';
import { postDeckList, preloadSessionData } from '../request/requests.js';

export class DeckListFormSection extends React.Component {
    render() {
        return (
            <div className='form-border bg-dark p-2 col-md-5'>
                <DeckListForm handler={this.props.handler}/>
            </div>
        );
    }
}

export class DeckListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckName: '',
            deckList: '',
            isValidDeckList: true,
            error: null
        };
        this.handleDeckNameChange = this.handleDeckNameChange.bind(this); 
        this.handleDeckListChange = this.handleDeckListChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePreload = this.handlePreload.bind(this);
    }

    // We make an initial request to the server on page load to get our previous session data
    // that way the user won't have to retype all the form data
    componentDidMount() {
        preloadSessionData(this.handlePreload);
    }

    handleDeckNameChange(event) {
        this.setState({ deckName: event.target.value });
    }

    handleDeckListChange(event) {
        this.setState({ deckList: event.target.value });
    }

    handlePreload(deckName,deckList) {
        this.setState({ deckName: deckName,deckList: deckList });
    }

    handleSubmit(event) {
        const deck = this.transformDeckList(this.state.deckList);
        const isValidDeckList = this.validateDeckList(deck);
        if (isValidDeckList.valid) {
            this.setState({ isValidDeckList: true });
            // POST TO BACKEND
            postDeckList(this.state.deckName,deck,this.props.handler);
        } else {
            this.setState({ isValidDeckList: false,error: isValidDeckList.error });
        }
        event.preventDefault();
    }

    // Convert String to Array
    transformDeckList(deckList) {
        let deck = deckList.split('\n');
        deck = deck.filter(card => { return card !== '' });
        deck.map(card => card.replace(/\r?\n|\n/g,''));
        return deck;
    }

    validateDeckList(deck) {
        // For each card in the deck, check if it is valid
        // If validation fails we pass back an error so we can set the error state
        let totalCards = 0;
        let encounteredCards = {};
        for (let i = 0; i < deck.length; i++) {
            const card = deck[i];
            const match = card.match(/(.+)\sx*([1-3])/);
            if (match == null) {
                return { valid: false,error: `Invalid card formatting: '${card}'` };
            } else {
                // Match card number to get total number of cards in deck
                const numberMatched = Number(match[2]); 
                totalCards += numberMatched; 
                let cardName = match[1].toLowerCase();
                if (encounteredCards[cardName]) {
                    encounteredCards[cardName] += numberMatched;
                    if (encounteredCards[cardName] > 3) {
                        return { valid: false,error: `Too many copies of '${cardName}', ${encounteredCards[cardName]}` };
                    }
                } else {
                    encounteredCards[cardName] = numberMatched;
                }
            }
        }
        if (totalCards >= 40 && totalCards <= 60) {
            return { valid: true };
        } else {
            if (totalCards < 40) {
                return { valid: false,error: `Too few cards in main deck: ${totalCards}` };
            } else {
                return { valid: false,error: `Too many cards in main deck: ${totalCards}` };
            }
        }
    }

    render() {
        if (this.state.isValidDeckList) {
            return (
                <form className='p-2' onSubmit={this.handleSubmit}>
                    <DeckNameInput formState={
                            { 
                                deckName: this.state.deckName,
                                handler: this.handleDeckNameChange 
                            }
                        }
                    />
                    <DeckListTextArea formState={
                            {
                                deckList: this.state.deckList,
                                handler: this.handleDeckListChange
                            }
                        }
                    />
                    <Button 
                        formState={
                            {
                                text: 'Create'
                            }
                        }
                    />
                </form>
            );
        } else {
            return this.renderWithError();
        }
    }

    // If the deck list is not valid
    renderWithError() {
        return (
            <Fragment>
                <div 
                    className='alert alert-danger alert-dismissable show fade' 
                    role='alert'>
                        {this.state.error}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <DeckNameInput formState={
                            { 
                                deckName: this.state.deckName,
                                handler: this.handleDeckNameChange 
                            }
                        }
                    />
                    <DeckListTextArea formState={
                            {
                               deckList: this.state.deckList,
                                handler: this.handleDeckListChange
                            }
                        }
                    />
                    <Button 
                        formState={
                            {
                                text: 'Create'
                            }
                        }
                    />
                </form>
            </Fragment>
        );
    }
}