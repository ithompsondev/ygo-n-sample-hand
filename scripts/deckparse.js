// Expect an array of the format [ 'card_name_A i', . . ., 'card_name_Z i' ], where i = 1/2/3
export function normalize(deckArray) {
    let normalizedDeck = [];
    deckArray.forEach(card => {
        const match = card.match(/(.+)\sx*([1-3])/);
        const cardName = match[1];
        const cardNr = match[2];
        for (let i = 0; i < cardNr; i++) { normalizedDeck.push(cardName); }
    });
    return normalizedDeck;
}