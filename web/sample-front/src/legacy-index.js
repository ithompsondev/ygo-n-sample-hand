import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './images.css'
import './fonts.css'
import './manual.css'

export function Header() {
    return (
        <div className='container-fluid text-warning pt-3 heading'>
            <h1 className='text-right'>YGO5 Draw</h1>
        </div>
    );
}

// Component that allows us to place other components next to each other using bootstrap grid
export function OptionContainer() {
    return (
        <div className='row align-items-center p-3'>
            <DescriptionPane data={{description: 'Use the form to start creating your deck',className: 'text-center col-md-4 container'}}/>
            <Option data={{component: <DeckForm />,className: 'col-md-4 container'}}/>
        </div>
    );
}

// Component that can be placed next to each other. Also wraps around other components such as text and buttons
export function Option(props) {
    return (
        <div className={props.data.className}>
            {props.data.component}
        </div>
    );
}

export function DescriptionPane(props) {
    return (
        <div className={props.data.className}>
            <h3 className='text-warning'>{props.data.description}</h3>
        </div>
    )
}

export function DeckNameInput(props) {
    return (
        <div className='form-group mb-3'>
            <input 
                value={props.deckName.deckName}
                onChange={props.deckName.handler} 
                type='text' 
                placeholder='Deck name' 
                className='form-control' 
                required
            />
        </div>
    );
}

export function DeckListTextarea(props) {
    return (
        <div className='form-group'>
            <textarea
                value={props.deckList.deckList}
                onChange={props.deckList.handler} 
                className='form-control' 
                rows='15' 
                required
            ></textarea>
            <small className='form-text text-dark'><b>Use exact card names</b></small>
        </div>
    );
}

export class DeckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckName: '',
            deckList: 'EXACT CARD NAME 1\nPot of Greed 3\nChange of Heart 3\nGraceful Charity 3',
            isValid: true
        };
        // Bind our event handler methods to this class
        this.handleDeckNameChange = this.handleDeckNameChange.bind(this);
        this.handleDeckListChange = this.handleDeckListChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    // Event handler method to update the state of the deckName each time a user types into the input form element
    handleDeckNameChange(event) {
        let typed = event.target.value;
        this.setState({ deckName: typed });
    }

    // Event handler method to update the state of the deckList each time a user types into the textarea from element]
    handleDeckListChange(event) {
        let typed = event.target.value;
        this.setState({ deckList: typed });
    }

    // Event handler method to handle validation of deckName and deckList
    handleSubmission(event) {
        const isValid = this.isValidDeckList();
        if (isValid.valid) {
            console.log('This is a valid deck list');
            // If the deck has been validated and is a valid deck, we can set the state of the form to
            // be valid, then we can go ahead an make a post request to the backend
            this.setState({ isValid: true });
            // POST REQUEST TO BACKEND
        } else {
            // If teh deck has been validated and is NOT a valid deck, we can set the state of the form
            // to be invalid, then we can use conditional rendering in the render() method
            console.log(`This is not a valid deck list. Error: ${isValid.error} on line ${isValid.line}`);
            this.setState({ isValid:false });
        }
        event.preventDefault();
    }

    isValidDeckList() {
        // Split the deck (immutable, return a new array) accordin to \n
        // Now we have an array of cards (expected);
        let deck = this.state.deckList.split('\n');
        // Remove the new line characters for each card
        deck.map(card => card.replace(/\r?\n|\n/g,''));
        // For each card in the deck, check if it is valid
        for (let i = 0; i < deck.length; i++) {
            const card = deck[i];
            const match = card.match(/(.+)\sx*([1-3])/);
            if (match == null) {
                return {
                    error: card,
                    line: i + 1,
                    valid: false
                };
            }
        }
        return { valid: true }; 
    }

    render() {
        if (this.state.isValid) {
            return (
                <form onSubmit={this.handleSubmission} className='was-validated'>
                    <DeckNameInput deckName={{deckName: this.state.deckName,handler: this.handleDeckNameChange}}/>
                    <DeckListTextarea deckList={{deckList: this.state.deckList,handler: this.handleDeckListChange}}/>
                    <button type='submit' className='btn-lg btn-warning mt-3'>Create</button>
                </form>                    
            );
        } else {
            // If the state of the form is invalid, we render a small alert above the form.
            return (
                <Fragment>
                    <div className='alert alert-danger alert-dismissable fade show' role='alert'>Invalid card formatting</div>
                    <form onSubmit={this.handleSubmission} className='was-validated'>
                        <DeckNameInput deckName={{deckName: this.state.deckName,handler: this.handleDeckNameChange}}/>
                        <DeckListTextarea deckList={{deckList: this.state.deckList,handler: this.handleDeckListChange}}/>
                        <button type='submit' className='btn-lg btn-warning mt-3'>Create</button>
                    </form>
                </Fragment> 
            )
        }
    }
}

export function Index() {
    return (
        <Fragment>
            <Header />
            <OptionContainer />
        </Fragment>
    );
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)