class Deck:
    def __init__(self):
        self.deck = []

    
    # [bottom card . . . top card]
    def add(self,card):
        self.deck.append(card)


    def draw(self):
        return self.deck.pop()


    def size(self):
        return len(self.deck)


    def shuffle(self):
        # shuffle deck
        pass

    def sample(self,n):
        hand = []
        for i in range(n):
            hand.append(self.draw())
        return hand