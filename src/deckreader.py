# Parse external DSL for deck construction
import re
from .deck import Deck
from .card import Card

# Delimter directed translation using regular expressions
regex = r'(.+)\s([1-3])'
nameMatch = 1
countMatch = 2

# A card maps the name to the number of cards in the deck
def parseFile(fileName):
    cards = []
    file = open(fileName,'r')
    for line in file.readlines():
        matches = re.search(regex,line)
        cardName = matches.group(nameMatch)
        cardNumber = int(matches.group(countMatch))
        # Just push each card to the intermediary deck
        for i in range(cardNumber): cards.append(Card(cardName))        
    return cards


def constructDeck(cards):
    deck = Deck()
    deck.construnct(cards)
    return deck