class Card:
    def __init__(self,name):
        self.name = name

    def __eq__(self,other):
        return (other.name == self.name)