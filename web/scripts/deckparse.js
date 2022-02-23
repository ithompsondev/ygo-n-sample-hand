const trailingRegex = /\r?\n|\r/; // trailing windows/linux and mac trailing newlines
const cardRegex = /(.+)\s+x*([1-3])/; // [CARD NAME][WHITE SPACE][1|2|3]

export function parseDeck(deckText) {
    const cleanedDeckText = cleanText(deckText);
    const lines = getLines(cleanedDeckText); // Remove trailing whitespace from form submission
    removeTrails(lines);
    let deck = createDeck(lines);
    return deck;
}

export function cleanText(text) {
    return text.trim();
}

function getLines(str) {
    return str.split('\n');
}

function removeTrails(lines) {
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(trailingRegex,'');
    }
}

function createDeck(lines) {
    let deck = [];
    lines.forEach(line => {
        const match = line.match(cardRegex);
        const name = match[1];
        const number = match[2];
        for (let i = 0; i < number; i++) {
            deck.push(name);
        }    
    });

    return deck;
}