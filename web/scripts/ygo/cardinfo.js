export function isNotMonster(cardType) {
    return ((cardType == 'Spell Card') || (cardType == 'Trap Card'))
}

// Parse monster card information from json response in response data[]
export function parseMonster(card) {
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

    if (isLinkMonster(monster.card_type)) {
        monster.link_value = card.linkval
        monster.link_arrows = card.linkmarkers
    } else if (isPendulumMonster(monster.card_type)) {
        monster.scale = card.scale
    }

    return monster
}

// Parse spell and trap card information from json response in data[]
export function parseSpellTrap(card) {
    let notMonster = {
        name: card.name,
        card_type: card.type,
        art: getDefaultImage(card.card_images),
        art_small: getDefaultSmallImage(card.card_images),
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

function isLinkMonster(cardType) {
    return (cardType == 'Link Monster')
}

function isPendulumMonster(cardType) {
    return ((cardType == 'Pendulum Effect Monster') || cardType == ('Pendulum Normal Monster'))
}

// The first image in the artwork array is the default image
function getDefaultSmallImage(artwork) {
    return artwork[0]['image_url_small']
}

function getDefaultImage(artwork) {
    return artwork[0]['image_url']
}