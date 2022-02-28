import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class Button extends React.Component {
    render() {
        return (
            <button 
                className='reverse-button-border btn btn-danger red-button mt-2 mb-2'
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