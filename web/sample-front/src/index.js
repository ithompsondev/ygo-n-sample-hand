import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './manual.css';

export class Button extends React.Component {
    render() {
        return (
            <button 
                className='btn btn-warning mt-2 mb-2'
                type='submit'
            >
                {this.props.formState.text}
            </button>
        );
    }
}

export class DeckListTextArea extends React.Component {
    render() {
        return (
            <div className='form-group'>
                <textarea 
                    className='form-control lock-size' 
                    value={this.props.formState.deckList} 
                    rows='12' 
                    onChange={this.props.formState.handler} 
                    required
                ></textarea>
                <small className='form-text text-muted'><b>Use exact card names</b></small>
            </div>
        );
    }
}

export class DeckNameInput extends React.Component {
    render() {
        return (
            <div className='form-group mb-2'>
                <input 
                    className='form-control' 
                    value={this.props.formState.deckName} 
                    type='text' 
                    placeholder='Deck Name' 
                    onChange={this.props.formState.handler} 
                    required
                />
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
    }

    // We make an initial request to the server on page load to get our previous session data
    // that way the user won't have to retype all the form data
    componentDidMount() {
        fetch('http://localhost:8000/',{
            method: 'GET',
            credentials: 'include'
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            }
        ).then(
            jResponse => {
                console.log('We received initial data from server');
                console.log(`Deck name: ${jResponse.deckName}`);
                console.log(`Deck list: ${jResponse.deckList}`);
                this.setState({
                    deckName: jResponse.deckName,
                    deckList: jResponse.deckList
                });
            }
        ).catch(err => { console.log(err) });
    }

    handleDeckNameChange(event) {
        this.setState({ deckName: event.target.value });
    }

    handleDeckListChange(event) {
        this.setState({ deckList: event.target.value });
    }

    handleSubmit(event) {
        const deck = this.transformDeckList(this.state.deckList);
        console.log(deck);
        const isValidDeckList = this.validateDeckList(deck);
        if (isValidDeckList.valid) {
            this.setState({ isValidDeckList: true });
            // POST TO BACKEND
            fetch('http://localhost:8000/deck/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deckName: this.state.deckName,
                    deckList: deck
                }),
                credentials: 'include'
            }).then(
                response => {
                    if (response.ok) {
                    return response.json();
                    }
                }
            ).then(
                jResponse => {
                    console.log(jResponse);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
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

export class DeckListFormSection extends React.Component {
    render() {
        return (
            <div className='col-md-5'>
                <DeckListForm />
            </div>
        );
    }
}

export class TextJumbotron extends React.Component {
    render() {
        return (
            <div className='jumbotron'>
                <h3>{this.props.instruction}</h3>
            </div>
        );
    }
}

export class InstructionJumbotronSection extends React.Component {
    render() {
        const deckName = 'Enter a deckname';
        const cardList = 'Enter card name and number';
        return (
            <div className='col-md-7 text-left'>
                <TextJumbotron instruction={deckName} />
                <TextJumbotron instruction={cardList} />
            </div>
        );
    }
}

export class PageContentRow extends React.Component {
    render() {
        return (
            <div className='row align-items-center p-5'>
                <InstructionJumbotronSection />
                <DeckListFormSection />
            </div>
        );
    }
}

// Stops the page from being horizontally scrollable: container -> row -> columns
export class PageContentContainer extends React.Component {
    render() {
        return (
            <div className='container'>
                <PageContentRow />
            </div>
        );
    }
}

export class PageHeader extends React.Component {
    render() {
        return (
            <div className='container-fluid bg-warning'>
                <h1 className='text-dark'>YGO5 DRAW</h1>
            </div>
        );
    }
}

export class Page extends React.Component {
    render() {
        // Initial get request to start
        return (
            <Fragment>
                <PageHeader />
                <PageContentContainer />
            </Fragment>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);