import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class ViewDeckListButton extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='col-md-4 btn-group'>
                    <button type='submit' onClick={this.props.handler} className='btn btn-block btn-lg btn-warning mb-3'>
                        View Deck
                    </button>
                </div>
                <div className='col-md-8'></div>    
            </Fragment>
        );
    }
}

export class StartSamplingButton extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='col-md-4 btn-group'>
                    <button type='submit' onClick={this.props.handler} className='btn btn-lg btn-warning mb-3'>
                        Draw sample Hands
                    </button>
                </div>
                <div className='col-md-8'></div>
            </Fragment>
        );
    }
}


export class ChangeDeckListButton extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='col-md-4 btn-group'>
                    <button type='submit' onClick={this.props.handler} className='btn btn-lg btn-warning'>
                        Alter Deck List
                    </button>
                </div>
                <div className='col-md-8'></div>
            </Fragment>
        );
    }
}

export class ButtonOptionSection extends React.Component {
    render () {
        return (
            <Fragment>
                <ViewDeckListButton handler={this.props.handlers.decklistHandler} />
                <StartSamplingButton handler={this.props.handlers.sampleHandler} />
                <ChangeDeckListButton handler={this.props.handlers.alterHandler} />
            </Fragment>
        );
    }
}

export class MissingCard extends React.Component {
    render() {
        return (
            <div>{this.props.error}</div>
        );
    }
}

export class MissingCardsAlert extends React.Component {
    render() {
        const errors = [];
        for (let i = 0; i < this.props.errors.length; i++) {
            errors.push(<Fragment key={i}><MissingCard error={this.props.errors[i]}/><br /></Fragment>);
        }
        return (
            <div 
                className='alert alert-danger alert-dismissable show fade mt-3' 
                role='alert'
            >{errors}</div>
        );
    }
}