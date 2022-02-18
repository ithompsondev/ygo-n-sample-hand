export default class Card {
    constructor(name) {
        this.name = name
    }

    equals(other) {
        if (other instanceof Card) {
            return this.name == other.name
        } else {
            return false
        }
    }
}