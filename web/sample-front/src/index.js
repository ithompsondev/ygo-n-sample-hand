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
                    rows='15' 
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
            deckList: 'Pot of Greed 3\nGraceful Charity 3\nChange of Heart 3',
            isValidDeckList: true
        };
        this.handleDeckNameChange = this.handleDeckNameChange.bind(this); 
        this.handleDeckListChange = this.handleDeckListChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleDeckNameChange(event) {
        this.setState({ deckName: event.target.value });
    }

    handleDeckListChange(event) {
        this.setState({ deckList: event.target.value });
    }

    handleSubmit(event) {
        const isValidDeckList = this.validateDeckList();
        if (isValidDeckList) {
            console.log('VALID DECK LIST');
            this.setState({ isValidDeckList: true });
            // POST TO BACKEND
        } else {
            console.log('INVALID DECK LIST')
            this.setState({ isValidDeckList: false });
        }
        event.preventDefault();
    }

    validateDeckList() {
        return false;
    }

    render() {
        if (this.state.isValidDeckList) {
            return (
                <form 
                    onSubmit={this.handleSubmit}
                    className='col-md-5 container border border-warning'
                >
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
                        Invalid card formatting
                </div>
                <form 
                    onSubmit={this.handleSubmit}
                    className='col-md-5 container border border-warning'
                >
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

export class TextJumbotron extends React.Component {
    render() {
        return (
            <div className='jumbotron'>
                <h3>{this.props.instruction}</h3>
            </div>
        );
    }
}

export class InstructionJumbotronContainer extends React.Component {
    render() {
        const deckName = 'Enter a deckname';
        const cardList = 'Enter card name and number';
        return (
            <div className='col-md-7 container text-left border border-warning'>
                <TextJumbotron instruction={deckName} />
                <TextJumbotron instruction={cardList} />
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

export class PageContent extends React.Component {
    render() {
        return (
            <Fragment>
                <PageHeader />
                <div className='row align-items-center p-5'>
                    <InstructionJumbotronContainer />
                    <DeckListForm />
                </div>
            </Fragment>
        );
    }
}

ReactDOM.render(
    <PageContent />,
    document.getElementById('root')
);