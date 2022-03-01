import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class Card extends React.Component {
    render() {
        return (
            <div className='col-4 col-sm-4 col-md-3 mb-2 p-0'>
                <img 
                    title={this.props.card.description} 
                    src={this.props.card.URL}
                    alt={this.props.card.name} 
                    style={{ width: '100%' }}/>
            </div>
        );
    }
}

export class Section extends React.Component {
    render() {
        let section = this.props.section.map(card => {
            return <Card card={{ description: card.description,name: card.name,URL: card.art }}/>
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
        const cards = this.props.deck.deck.map((card,index) => {
            return <Card key={index} card={{ description: card.description,URL: card.art }}/>
        });
        return (
            <div className='sample-viewer p-3 col-md-12 align-items-center mt-5'>
                <div className='col-md-12 site-text'><h2>{this.props.deck.name}</h2> </div>
                <div className='row'>
                    {cards}
                </div>
                <div className='row'>
                    <div className='col-md-8'></div>
                    <div className='col-md-4 justify-right site-text'><h3>{this.props.deck.deck.length} cards</h3></div>
                </div>
            </div>
        );    
    }
}

export class ReturnOption extends React.Component {
    render() {
        return (
            <div className='col-md-4 mt-3 mb-3 btn-group'>
                <button className='button-border red btn p-3 btn-lg btn-dark' onClick={this.props.handler}><h4>Return</h4></button>
            </div>
        );
    }
}