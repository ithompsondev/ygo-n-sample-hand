from src.deck import Deck
from src.deckreader import parseFile,constructDeck
import sys

def buildDeck(deckFile):
    cards = parseFile(deckFile)
    deck = constructDeck(cards)
    return deck


def nSampleHands(deck,n,sampleSize):
    for i in range(n):
        print(f'Hand {i + 1}')
        displayHand(deck.sample(sampleSize))
        print('\n')

def displayHand(hand):
    for card in hand:
        print(card.name)


def main():
    deckFile = sys.argv[1]
    deck = buildDeck(deckFile)
    handSize = 5
    n = int(deck.size()/handSize)
    deck.shuffle()
    nSampleHands(deck,n,handSize)


if __name__ == '__main__':
    main()

