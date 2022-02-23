export function cleanText(text) {
    return text.trim();
}

export function encode(text) {
    // encodes the query string by replacing whitespaces and other special characters with URI codes
    return encodeURIComponent(text);
}

// Remove any duplicates in an array. used for decklist that contains multiples of the same card
export function removeDuplicates(array) {
    let unique = [];
    let seen = {};
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (!seen[item]) {
            unique.push(item);
            seen[item] = 1;
        }
    }
    return unique;
}