import fetch from 'node-fetch'
import { cleanText } from './deckparse.js'

const endpoint = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
const whitespaceRegex = /\s+/g // Use the g flag to match all 1 or more whitespaces in a string
const uriWhitespace = '%20'
const nameQuery = '?name='

// Remove any duplicates in an array. used for decklist that contains multiples of the same card
function removeDuplicates(array) {
    let unique = []
    let seen = {}
    for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (!seen[item]) {
            unique.push(item)
            seen[item] = 1
        }
    }
    console.log(unique)
    return unique
}

function isNotMonster(cardType) {
    return ((cardType == 'Spell Card') || (cardType == 'Trap Card'))
}

function getDefaultSmallImage(artwork) {
    return artwork[0]['image_url_small']
}

function getDefaultImage(artwork) {
    return artwork[0]['image_url']
}

// Parse monster card information from json response in response data[]
function parseMonster(card) {
    let monster = {
        name: card.name,
        attribute: card.attribute,
        level: card.level,
        art: getDefaultImage(card.card_images),
        art_small: getDefaultSmallImage(card.card_images),
        card_type: card.type,
        monster_type: card.race,
        description: card.desc,
        attack: card.atk,
        defence: card.def
    }

    const isLinkMonster = monster.card_type == 'Link Monster'
    const isPendulumEffectMonster = monster.card_type == 'Pendulum Effect Monster'
    const isPendulumNormalMonster = monster.card_type == 'Pendulum Normal Monster'
    if (isLinkMonster) {
        monster.link_value = card.linkval
        monster.link_arrows = card.linkmarkers
    } else if (isPendulumEffectMonster || isPendulumNormalMonster) {
        monster.scale = card.scale
    }

    return monster
}

// Parse spell and trap card information from json response in data[]
function parseSpellTrap(card) {
    let notMonster = {
        name: card.name,
        card_type: card.type,
        art: card.card_images,
        description: card.desc,
    }

    const isSpell = notMonster.card_type == 'Spell Card' 
    if (isSpell) {
        notMonster.spell_type = card.race
    } else {
        notMonster.trap_type = card.race
    }

    return notMonster
}

// Extrapolating meaningful data might take some time, so we promise to get meaningful data from json
function extrapolateMeaningfulCardData(json) {
    return new Promise((resolve,reject) => {
        // Get the data array in the json
        const data = json.data
        console.log(`Number of cards in JSON response: ${data.length}`)
        let meaningfulData = []
        for (let i = 0; i < data.length; i++) {
            // data is an array of object literals that represent a card
            const card = data[i]
            if (isNotMonster(card.type)) {
                meaningfulData.push(parseSpellTrap(card))
            } else {
                meaningfulData.push(parseMonster(card))
            }
        }
        resolve(meaningfulData)
    })
}

export function displayMeaningfulData(data) {
    // Expect an array of object
    for (let i = 0; i < data.length; i++) {
        console.log('\n')
        const card = data[i]
        for (const prop in card) {
            console.log(`${prop}: ${card[prop]}`)
            
        }
    }
}

// Convert a single cards name into a query string
function cardToQueryStr(card) {
    return card.replace(whitespaceRegex,uriWhitespace)
}

// Expects an array of card names
function cardsToQueryStr(cardNames) {
    // We want to remove duplicate card names before making the query to avoid duplicate requests
    const uniqueCardNames = removeDuplicates(cardNames)
    return uniqueCardNames.map(card => cardToQueryStr(card))
}

export function queryCard(cardName) {
    return new Promise(async (resolve,reject) => {
        const cardNameQuery = cardToQueryStr(cleanText(cardName))
        const response = await fetch(`${endpoint}${nameQuery}${cardNameQuery}`)
        if (response.ok) {
            try {
                // JSON contains a data property, which is an array of object literals
                // data will only have one object literal for querying one card
                const json = await response.json()
                resolve(extrapolateMeaningfulCardData(json))
            } catch (err) {
                reject('Could not get response JSON')
            }
        } else {
            reject(response.status)
        }
    })
}

// TODO: FIX ME. NEED A WAY TO COLLECT ALL THE DATA BEFORE EXTRAPOLATING MEANINGFUL CONTENTS
export function queryCards(cardNames) {
    const meaningfulCards = []
    removeDuplicates(cardNames)
    return new Promise(async (resolve,reject) => {
        for (let i = 0; i < cardNames.length; i++) {
            try {
                // We expect a reolved promise to return an array of meaningful card data 
                // (object literals)
                const meaningfulCard = await queryCard(cardNames[i])
                for (let j = 0; j < meaningfulCard.length; j++) {
                    meaningfulCards.push(meaningfulCard[j])
                }
            } catch (err) {
                reject(err)
            }
        }
        resolve(meaningfulCards)
    })
}

