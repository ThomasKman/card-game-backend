var assert = require('assert');
const Deck = require('../Deck/deck');

// generate new Deck
const deck = new Deck();

describe('Deck', function () {
  // test getCardds and Card generation in Constructor
  describe('getCards()', function () {
    it('should return 52 cards', function () {
      //shuffle deck to prevent this test from breaking by proxy
      deck.shuffle();
      assert.equal(deck.getCards().length, 52);
    });
  });

  describe('shuffle()', function () {
    it('should shuffle cards', function () {
      // generate first deck for comparison
      deck.shuffle();
      const sampleDeck = deck.getCards();

      // generate second deck for comparison
      deck.shuffle();
      const testDeck = deck.getCards();

      // card variables for comparison
      var sampleCard, testCard;

      // test condition
      var isShuffled = false;

      // compare each card until difference in card order is found
      for (i = 0; i < sampleDeck.length; i++) {
        sampleCard = sampleDeck[i];
        testCard = testDeck[i];
        if (
          sampleCard.value != testCard.value &&
          sampleCard.suit != testCard.suit
        ) {
          isShuffled = true;
          return;
        }
      }

      assert.equal(isShuffled, true);
    });
  });

  describe('deal()', function () {
    it('should return right amount of hands', function () {
      //deal 5 hands
      var hands = deck.deal(5);
      assert.equal(hands.length, 5);
    });

    it('should return right amount cards per Hand', function () {
      // deal 7 hands of 7 cards
      var hands = deck.deal(7);

      // test condition
      var hasRightAmountsPerHand = true;

      // check each hand for card count
      for (i = 0; i < hands.length; i++) {
        if (hands[i].length != 7) {
          hasRightAmountsPerHand = false;
        }

        assert.equal(hasRightAmountsPerHand, true);
      }
    });

    it('should leave right amount of cards in deck', function () {
      //deal 6 hands leaving 4 cards in deck
      var hands = deck.deal(6);
      assert.equal(deck.getCards().length, 4);
    });
  });

  describe('swap(cards)', function () {
    it('should return top cards in deck', function () {
      // deal hand for swapping
      var hand = deck.deal(6)[0];

      // determine top 2 cards of remaining deck for comparison
      var topCard1 = deck.getCards()[deck.getCards().length - 1];
      var topCard2 = deck.getCards()[deck.getCards().length - 2];

      // draw two cards from hand for swapping
      var swapCards = [hand.pop(), hand.pop()];

      // swap cards with top cards in deck
      var swappedCards = deck.swap(swapCards);

      // single out swapped cards for comparison
      var swappedCard1 = swappedCards[0];
      var swappedCard2 = swappedCards[1];

      // compare top 2 cards from deck with swapped cards
      isTopCard =
        swappedCard1.value == topCard1.value &&
        swappedCard1.suit == topCard1.suit &&
        swappedCard2.value == topCard2.value &&
        swappedCard2.suit == topCard2.suit;
      assert.equal(isTopCard, true);
    });

    it('should put cards on bottom of the deck', function () {
      // deal hand for swapping
      var hand = deck.deal(5)[0];

      // draw two cards from hand for swapping
      var swapCards = [hand.pop(), hand.pop()];

      // swap cards with top cards in deck
      deck.swap(swapCards);

      // single out swapped cards for comparison
      var deckCard1 = deck.getCards()[0];
      var deckCard2 = deck.getCards()[1];

      // compare top 2 cards from deck with swapped cards
      isTopCard =
        swapCards[1].value == deckCard1.value &&
        swapCards[1].suit == deckCard1.suit &&
        swapCards[0].value == deckCard2.value &&
        swapCards[0].suit == deckCard2.suit;
      assert.equal(isTopCard, true);
    });

    it('should leave correct number of cards in deck', function () {
      // deal 6 hands leaving 4 cards in deck
      var hand = deck.deal(6)[0];

      //swap 1 card from deck with 1 card1 from hand
      deck.swap([hand[0]])[0];
      assert.equal(deck.getCards().length, 4);
    });
  });

  describe('draw(cardCount)', function () {
    it('should draw right amount of cards', function () {
      deck.shuffle();
      // draw 5 cards into hand
      var hand = deck.draw(5);
      assert.equal(hand.length, 5);
    });

    it('should draw top cards', function () {
      deck.shuffle();

      // determine top 2 cards in deck
      var topCard1 = deck.getCards()[deck.getCards().length - 1];
      var topCard2 = deck.getCards()[deck.getCards().length - 2];

      // draw 2 cards from deck
      var hand = deck.draw(2);

      //test condition
      areTopCards =
        hand[0].value == topCard1.value &&
        hand[0].suit == topCard1.suit &&
        hand[1].value == topCard2.value &&
        hand[1].suit == topCard2.suit;

      assert.equal(areTopCards, true);
    });
  });
});
