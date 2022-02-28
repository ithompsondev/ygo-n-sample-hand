import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class Card extends React.Component {
    render() {
        return (
            <div className='col-1 col-sm-1 col-md-1 mb-2 p-1'>
                <img 
                    title={this.props.card.description} 
                    src={this.props.card.URL} 
                    style={{ width: '100%' }}/>
            </div>
        );
    }
}

export class Section extends React.Component {
    render() {
        let section = this.props.section.map(card => {
            return <Card card={{ description: card.description,URL: card.art }}/>
        })
        section.unshift(<div className='col-1 col-sm-1 col-md-1'></div>)
        section.push(<div className='col-1 col-sm-1 col-md-1'></div>)
        return (
            <div className='row'>
                {section}
            </div>
        );
    }
}

export class DeckListViewer extends React.Component {
    render() {
        let sections = []
        let section = []
        for (let i = 0; i < this.props.deck.deck.length; i++) {
            section.push(this.props.deck.deck[i]);
            if (section.length == 10) {
                sections.push(<Section section={section} />);
                section = [];
            }
        }

        if (section.length > 0) {
            sections.push(<Section section={section} />);
        }

        return (
            <div className='row align-items-center mt-5'>
                <div className='col-md-12'><h3>{this.props.deck.name}</h3> </div>
                {sections}
                <div className='col-md-8'></div>
                <div className='col-md-4 justify-right'><h4>{this.props.deck.deck.length} cards</h4></div>
            </div>
        );    
    }
}

export class ReturnOption extends React.Component {
    render() {
        return (
            <div className='col-md-4 mt-5 btn-group'>
                <button className='btn p-3 btn-large btn-warning' onClick={this.props.handler}>Return</button>
            </div>
        );
    }
}