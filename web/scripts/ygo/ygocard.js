import fetch from 'node-fetch';
import { cleanText,encode,removeDuplicates } from './url.js';
import { isNotMonster,parseMonster,parseSpellTrap } from './cardinfo.js';

const endpoint = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const nameQuery = '?name=';

// Promise to get the json response after we made a request to the specified endpoint
function request(endpoint,cardName) {
    return new Promise(async (resolve,reject) => {
        const response = await fetch(endpoint);
        if (response.ok) {
            try {
                resolve(await response.json());
            } catch (err) {
                reject(err);
            }
        } else {
            reject(`Could not find card: '${cardName}'`);
        }        
    });
}

// Convert a single card name into a query string accounting for ampersands and white space
function cardToQueryStr(card) {
    // Clean the card text before replacing any whitespace
    card = cleanText(card);
    return encode(card);
}

// Make a single query to the api endpoint
export function queryCard(cardName) {
    return new Promise(async (resolve,reject) => {
        const cardNameQuery = cardToQueryStr(cardName);
        try {
            const response = await request(`${endpoint}${nameQuery}${cardNameQuery}`);
            resolve(extrapolateMeaningfulCardData(response));
        } catch (err) {
            reject(err);
        }
    })
}

// Make many queries to the api endpoint
// TODO: If we get a bad request 400, we should still continue to process as many cards as possible
// optionally returning the bad request
export function queryCards(cardNames,cardDB) {
    //let uniqueCardNames = cardsToQueryStr(cardNames)
    let cardLen = cardNames.length;
    let responses = [];
    let dbEntries = [];
    let errors = [];
    return new Promise(async (resolve,reject) => {
        for (let i = 0; i < cardLen; i++) {
            const cardName = cardNames[i];
            try {
                const card = await cardDB.cardExists(cardName);
                if (card) {
                    // If the card exists in the DB, temp store it in the dbEntry []
                    console.log(`${cardName} exists in the DB`);
                    dbEntries.push(card);
                } else {
                    // If the card does not exist in the DB, query the endpoint to extrapolate mean. later
                    const query = cardToQueryStr(cardName);
                    console.log(`Querying: ${query}`);
                    try {
                        const response = await request(`${endpoint}${nameQuery}${query}`,cardName);
                        // We need to immediately store card data after a request to the endpoint
                        const meaningfulData = await extrapolateMeaningfulCardData(response);
                        for (let m = 0; m < meaningfulData.length; m++) {
                            // meaningfulData is an [Cards]
                            // insertCard expects a card object
                            // We await the resolution of saving a new entry to the DB to ensure it is added
                            // before moving on
                            await cardDB.insertCard(meaningfulData[m]);
                            responses.push(meaningfulData[m]);
                        }
                    } catch (err) {
                        errors.push(err);
                    }
                }
            } catch (err) {
                reject(err);
            }
        }

        if (errors.length == 0) { errors = null; }
        if (responses.length > 0) {
            // If we made atleast 1 call to the endpoint we need to concatenate responses and dbEntries []
            resolve({ cards: responses.concat(dbEntries),errors: errors });
        } else {
            resolve({ cards: dbEntries,errors: errors });
        }
    });
}

// Extrapolating meaningful data might take some time, so we promise to get meaningful data from json
function extrapolateMeaningfulCardData(json) {
    return new Promise((resolve,reject) => {
        // Get the data array in the json
        const data = json.data;
        let meaningfulData = []; // array of object literals representing a card
        for (let i = 0; i < data.length; i++) {
            // data is an array of object literals that represent a card
            const card = data[i];
            if (isNotMonster(card.type)) {
                meaningfulData.push(parseSpellTrap(card));
            } else {
                meaningfulData.push(parseMonster(card));
            }
        }
        // Meaningful data is now [Card objects]
        resolve(meaningfulData);
    })
}

export function displayMeaningfulData(data) {
    // Expect an array of object
    for (let i = 0; i < data.length; i++) {
        console.log('\n');
        const card = data[i];
        for (const prop in card) {
            console.log(`${prop}: ${card[prop]}`);
        }
    }
}