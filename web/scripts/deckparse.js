import Deck from './deck.js'
import Card from './card.js'

const trailingRegex = /\r?\n|\r/ // trailing windows/linux and mac trailing newlines
const cardRegex = /(.+)\s+([1-3])/ // [CARD NAME][WHITE SPACE][1|2|3]

export function parseDeck(deckText) {
    const cleanedDeckText = cleanText(deckText)
    const lines = getLines(cleanedDeckText) // Remove trailing whitespace from form submission
    removeTrails(lines)
    const cards = createCards(lines)
    const deck = new Deck()
    deck.construct(cards)
    return deck
}

function cleanText(text) {
    return text.trim()
}

function getLines(str) {
    return str.split('\n')
}

function removeTrails(lines) {
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(trailingRegex,'')
    }
}

function createCard(line) {
    const lineMatch = line.match(cardRegex)
    if (lineMatch) {
        const cardName = lineMatch[1]
        const cardNumber = lineMatch[2]
        return {
            name: cardName,
            number: cardNumber
        }
    } else {
        // handle error
    }
}

function createCards(lines) {
    let cards = []
    for (let i = 0; i < lines.length; i++) {
        let card = createCard(lines[i])
        let number = card.number
        for (let i = 0; i < number; i++) {
            cards.push(new Card(card.name))
        }
    }
    return cards
}