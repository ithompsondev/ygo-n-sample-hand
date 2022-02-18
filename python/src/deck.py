import random

class Deck:
    # Keeping track of card numbers
    def __init__(self):
        self.deck = []


    # Construct a deck using an already existing list of cards
    def construnct(self,cards):
        self.deck = cards


    # [bottom card . . . top card]
    def add(self,card):
        self.deck.append(card)


    def draw(self):
        return self.deck.pop()


    def size(self):
        return len(self.deck)


    def shuffle(self):
        random.shuffle(self.deck)

    def sample(self,n):
        hand = []
        for i in range(n):
            hand.append(self.draw())
        return hand