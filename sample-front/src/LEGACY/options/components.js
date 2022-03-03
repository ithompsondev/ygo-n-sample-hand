import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class ViewDeckListButton extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='col-md-12 btn-group'>
                    <button type='submit' onClick={this.props.handler} className='reverse-button-border btn btn-block btn-lg btn-dark mb-3'>
                        <h3>View Deck</h3>
                    </button>
                </div>    
            </Fragment>
        );
    }
}

export class StartSamplingButton extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='col-md-12 btn-group'>
                    <button type='submit' onClick={this.props.handler} className='reverse-button-border btn btn-lg btn-dark mb-3'>
                        <h3>Draw Sample Hands</h3>
                    </button>
                </div>
            </Fragment>
        );
    }
}


export class ChangeDeckListButton extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='col-md-12 btn-group'>
                    <button type='submit' onClick={this.props.handler} className='reverse-button-border btn btn-lg btn-dark'>
                        <h3>Change Deck List</h3>
                    </button>
                </div>
            </Fragment>
        );
    }
}

export class ButtonOptionSection extends React.Component {
    render () {
        return (
            <div className='col-md-4'>
                <div className='row'>
                    <ViewDeckListButton handler={this.props.handlers.decklistHandler} />
                    <StartSamplingButton handler={this.props.handlers.sampleHandler} />
                    <ChangeDeckListButton handler={this.props.handlers.alterHandler} />
                </div>
            </div>
        );
    }
}

export class MissingCard extends React.Component {
    render() {
        return (
            <div className='col-md-12'>{this.props.error}</div>
        );
    }
}

export class MissingCardsAlert extends React.Component {
    render() {
        const errors = [];
        for (let i = 0; i < this.props.errors.length; i++) {
            errors.push(<Fragment key={i}><MissingCard error={this.props.errors[i]}/></Fragment>);
        }
        return (
            <Fragment>
                <div className='col-md-4'></div>
                <div 
                    className='col-md-4 alert alert-danger alert-dismissable fade show' 
                    role='alert'
                >
                    <div className='row'>
                        {errors}
                    </div>
                </div>
            </Fragment>
        );
    }
}