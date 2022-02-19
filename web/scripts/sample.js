export function shuffle(deck) {
    for (let i = 0; i < deck.length - 2; i++) {
        const randPos = randBetween(i,deck.length)
        swap(i,randPos,deck)
    }
}

// TODO: (FRONTEND -> BACKEND) Option for selecting good and bad starting hands to see which cards are common among them
// FOR NOW: Storing Session data in a mongostore, saving deck in mongodb
export function sample(deck) {
    shuffle(deck)
    const handSize = 5
    let hands = []
    let hand = []
    for (let i = deck.length - 1; i >= 0; i--) {
        // We draw cards from the top of the deck
        hand.push(deck[i])
        if (hand.length == handSize) {
            // Once we have drawn 5 cards, we make a hand, so we store that hand
            hands.push(hand)
            // We then clear the hand and start again
            hand = []
        }
    }

    // If our deck consisted of a number of cards that is not a multiple of 5
    // we can handle the remaining cards here
    if (hand.length > 0) {
        hands.push(hand)
    }
    return hands
}

function randBetween(min,max) {
    // excluding max
    return Math.floor(Math.random() * (max - min) + min)
}

function swap(i,j,array) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}