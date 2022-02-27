import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/manual.css';

export class ResampleButton extends React.Component {
    render() {
        return (
            <div className='col-md-4 mt-5 btn-group'>
                <button className='btn p-3 btn-large btn-warning' onClick={this.props.handler}>Re-sample</button>
            </div>
        );
    }
}

export class Card extends React.Component {
    render() {
        return (
            <div className='col-md-2'>
                <img src={this.props.URL} style={{ 'object-fit': 'contain',width: '100%' }}/>
            </div>
        );
    }
}

export class Hand extends React.Component {
    render() {
        let hand = this.props.hand.hand.map(card => {
            return (<Card URL={card.art} />);
        })
        hand.unshift(<div className='col-md-1'></div>);
        hand.push(<div className='col-md-1'></div>);
        return (
            <div className='row mt-1 mb-1'>
                <div className='col-md-12 mt-2'><h3>Hand {this.props.hand.number}</h3></div>
                {hand}
            </div>
        );
    }
}

export class SampleSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { deck: this.props.deck };
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
    }

    sample() {
        this.shuffle();
        const handSize = 5;
        let hands = [];
        let hand = [];
        for (let i = this.state.deck.length - 1; i >= 0; i--){
            const card = this.state.deck[i];
            hand.push(card);
            if (hand.length == handSize) {
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
        hands = hands.map(hand => {
            return (<Hand hand={{ number: i++,hand: hand }} />);
        });
        return (
            <div className='row align-items-center'>
                {hands}
            </div>
        );
    }
}