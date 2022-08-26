// Deck.js
function Deck() {
  if (!(this instanceof Deck)) {
    return new Deck();
  }

  // generate array for cards {suit,value}, fill and shuffle
  this.cards = [];
  this.shuffle();
}

// returns deck
Deck.prototype.getCards = function getDeck() {
  return this.cards;
};

// fills and shuffles deck with 52 cards
Deck.prototype.shuffle = function shuffle() {
  // generate temp deck
  var generatedDeck = [];

  // generate 52 cards, 13 of each of the 4 suits
  for (suit = 1; suit < 5; suit++) {
    //starting at 2 because ace has highest value
    for (value = 2; value < 15; value++) {
      generatedDeck.push({ suit: suit, value: value });
    }
  }

  // swap index, swapper card
  var j, swapper;

  // shuffle deck by swapping each card with a random index card
  for (i = generatedDeck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    swapper = generatedDeck[i];
    generatedDeck[i] = generatedDeck[j];
    generatedDeck[j] = swapper;
  }

  // override deck with temp deck
  this.cards = generatedDeck;
};

// deal specific number of hands until deck is depleted, leaving rest of cards in deck
Deck.prototype.deal = function deal(playerCount) {
  // fill and shuffle deck
  this.shuffle();

  // determine left over cards
  const rest = 52 % playerCount;

  // determine card count per hand
  const cardCount = (52 - rest) / playerCount;
  // empty arrays for single and multiple hands
  var hands = [];
  var hand = [];

  // playercount restricted to 7 preventing too small hands
  if (playerCount < 8) {
    // draw j amount of cards for i players
    for (i = 0; i < playerCount; i++) {
      hand = [];

      for (j = 0; j < cardCount; j++) {
        hand.push(this.cards.pop(j));
      }
      hands.push(hand);
    }
  }

  return hands;
};

// draw top n cards and put n cards from hand at the bottom of the deck
Deck.prototype.swap = function swap(cards) {
  // cards for return, temp hand, drawn card
  var swappedCards = [];
  var deck = [];
  var swapCard;

  for (i = 0; i < cards.length; i++) {
    // refresh temp deck from deck
    deck = this.getCards();
    // draw top card
    swapCard = deck.pop();
    // put drawn card in temp hand
    swappedCards.push(swapCard);
    // put card from hand on bottom of deck
    deck.unshift(cards[i]);
    // refresh deck from temp deck
    this.cards = deck;
  }

  return swappedCards;
};

Deck.prototype.draw = function draw(cardCount) {
  var cards = [];

  for (i = 0; i < cardCount; i++) {
    deck = this.getCards();
    var card = deck.pop();
    cards.push(card);
    this.cards = deck;
  }

  return cards;
};

// Deck.prototype.printCards = function printCards(cards) {
//   console.log('#######');
//   for (i = 0; i < cards.length; i++) {
//     console.log('[' + i + ']' + ':' + cards[i].value + ' ' + cards[i].suit);
//   }
//   console.log('#######');
// };

module.exports = Deck;
