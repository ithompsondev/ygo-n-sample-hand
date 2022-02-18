export default class Deck {
    constructor() {
        this.deck = []
    }

    construct(cards) {
        this.deck = cards
    }

    add(card) {
        this.deck.push(card)
    }

    draw() {
        card = this.deck.pop()
        return card
    }

    shuffle() {
        for (let i = 0; i < this.deck.length - 2; i++) {
            let rand = intBetween(i,this.deck.length)
            swap(i,rand,this.deck)
        }
    }
}

function intBetween(min,max) {
    // Excluding max
    // Also, we do not want our random integer to be the min value
    let rand = min
    while (rand == min) {
        rand = Math.floor(Math.random()*(max - min) + min)
    }
    return rand
}

// JS is pass by reference for arrays and objects, so changes to them inside here are permanent
function swap(first,second,array) {
    let temp = array[first]
    array[first] = array[second]
    array[second] = temp
}