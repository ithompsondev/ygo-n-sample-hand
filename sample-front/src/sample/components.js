import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class ResampleButton extends React.Component {
    render() {
        return (
            <div className='col-md-4 mt-3 mb-3 btn-group'>
                <button className='button-border red btn-lg p-3 btn btn-dark' onClick={this.props.handler}><h4>Re-sample</h4></button>
            </div>
        );
    }
}

export class Card extends React.Component {
    render() {
        const cardURL = this.props.data.URL;
        const cardName = this.props.data.name;
        return (
            <div className='col-sm-4 col-4 col-md-2 p-2'>
                <img src={cardURL} alt={cardName} style={{ 'objectFit': 'contain',width: '100%' }}/>
            </div>
        );
    }
}

export class Hand extends React.Component {
    render() {
        let hand = this.props.hand.hand.map((card,index) => {
            return (<Card key={index} data={{ name: card.name,URL: card.art,handler: this.props.hand.handler }} />);
        })
        hand.unshift(<div className='col-md-1'></div>);
        hand.push(<div className='col-md-1'></div>);
        return (
            <div className='row mt-1 mb-1'>
                <div className='col-md-12 mt-2 site-text'><h2>HAND {this.props.hand.number}</h2></div>
                {hand}
            </div>
        );
    }
}

export class SampleSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { deck: this.props.deck,view: 'default',card: null};
        this.handleCardTouch = this.handleCardTouch.bind(this);
    }

    handleCardTouch(card) {
        this.setState({ view: 'card',card: card});
        console.log(card);
    }

    shuffle() {
        const len = this.state.deck.length;
        const randPos = (min,max) => {
            return Math.floor(Math.random() * (max - min) + min);
        }
        for (let i = 0; i < this.state.deck.length - 2; i++) {
            this.swap(i,randPos(i,len));
        }
    }

    swap(i,j) {
        const temp = this.state.deck[i];
        this.state.deck[i] = this.state.deck[j];
        this.state.deck[j] = temp;
        // let copyDeck = this.state.deck.slice();
        // const temp = copyDeck[i];
        // copyDeck[i] = copyDeck[j];
        // copyDeck[j] = temp;
        // this.setState({ deck: copyDeck });
    }

    sample() {
        this.shuffle();
        const handSize = 5;
        let hands = [];
        let hand = [];
        for (let i = this.state.deck.length - 1; i >= 0; i--){
            const card = this.state.deck[i];
            hand.push(card);
            if (hand.length === handSize) {
                hands.push(hand);
                hand = [];
            }
        }   

        if (hand.length > 0) {
            hands.push(hand);
        }
        return hands;
    }

    render() {
        let hands = this.sample();
        let i = 1;
        hands = hands.map((hand,index) => {
            return (<Hand key={index} hand={{ number: i++,hand: hand}} />);
        });
        return (
            <div className='col-md-12 align-items-center sample-viewer p-3'>
                {hands}
            </div>
        );
    }
}