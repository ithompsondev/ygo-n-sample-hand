export function shuffle(deck) {
    for (let i = 0; i < deck.length - 2; i++) {
        const randPos = randBetween(i,deck.length)
        swap(i,randPos,deck)
    }
}

// TODO: Fix This
export function sample(deck) {
    shuffle(deck)
    let hands = []
    let currentDeckSize = deck.length
    while (currentDeckSize > 5) {
        hands.push(deck.slice(currentDeckSize-5,currentDeckSize))
        currentDeckSize -= 5
    }
    hands.push(0,currentDeckSize)
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