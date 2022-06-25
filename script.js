//===== BLACK JACK GAME =====//
// Step 1 - Shuffle Deck
// Step 2 - Deal 2 cards each to Player and Computer (Dealer).
// Step 3 - Player chooses whether to "hit" or "stand".
// Step 4 - Player card selection is finalized.
// Step 5 - Computer (Dealer) card selection is finalized.
// Step 6 - Compare Player's cards against Computer's cards, and determine winner.
// Step 7 - Game resets and continues.

// Planning
// 1) Define game states and global variables.
// 2) Make create (make) deck helper function. - Helper Function 1
// 3) Make shuffle deck helper function. - Helper Function 2
// 4) Make 2 separate arrays to store Player's Cards and Computer Cards.
// 5) Main function - Change to game state for Dealing Cards from base state (Press Submit), and output message for displaying 2 cards to Player, and showing 2 cards on Computer's hand.
// 6) Main function - Game State to shift to Player inputing whether to "hit" or "stand".
// 7) Main function - Game State to shift to Player receiving 1 card per turn if Player chooses "hit".
// 8) Main function - Game State to shift to Dealer receiving cards if Dealer has less than score = 17.
// 8) (Otherwise) Main function - Game State to shift to Compare Cards between Player and Computer (Dealer) if Player chooses "stand".
// 9) Make dealing card helper function. - Helper Function 3
// 10) Make Computer card generation helper function. - Helper Function 4
// 11) Make compare scores helper function. - Helper Function 5
// 12) Make reset game helper function. - Helper Function 6
// 13) Make computing score helper function. - Helper Function 7
// 14) Compute scores for Aces on hand within Helper Function 7.
// 15) Make reveal card hand function - Helper Function 8.

// Global Variables
// GV - Constants
const GAME_STATE_START_GAME = "Game State - Start of Game";
const GAME_STATE_DEAL_CARDS = "Game State - Deal Cards";
const GAME_STATE_CHOOSE_PLAYER_CHOICE = "Game State - Choose Hit or Stand";
const GAME_STATE_DEAL_COM_ADD_CARDS =
  "Game State - Computer - Deal Additional Cards";
const GAME_STATE_COMPARE_CARDS = "Game State - Compare Cards";

// GV - Variables
var gameState = GAME_STATE_START_GAME;
var gameRound = 0;
var dealCardPlayerRound = 1;
var playerScore = 0;
var computerScore = 0;
var currentPlayerScore = 0;
var currentPlayerScoreNumber = 0;
var currentComputerScore = 0;
var currentComputerScoreNumber = 0;
var instructionToPlayer = `To Player - <br><br> Please input "hit" 👈 if you like to draw an additional card from the deck <br><br> OR <br><br> "stand" ✋ if you are satisfied with your hand and would like to compare your score against the Computer.`;
var instructionToPlayerChooseStand = `To Player - <br><br> You have chosen to "stand" ✋.<br>Please press the Submit button to reveal the Computer's final hand.`;
var playerCard = "";
var computerCard = "";

// Arrays
var playerHand = [];
var computerHand = [];
var cardDeck = [];
var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
var emoji = ["♥", "♦", "♣", "♠"];

// Helper Functions
// Helper Function 1 - Make Deck Function
var makeDeck = function () {
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    var cardIndex = 1;
    while (cardIndex <= 13) {
      var cardName = cardIndex;
      var cardScore = cardName;
      var cardImageArray = [
        "🅰",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
        "🔟",
        "Jack - 👲",
        "Queen - 👸",
        "King - 🤴",
      ];
      var cardImage = cardImageArray[cardIndex - 1];
      if (cardName == 1) {
        cardName = "Ace";
        cardScore = 11;
      }
      if (cardName == 11) {
        cardName = "Jack";
        cardScore = 10;
      }
      if (cardName == 12) {
        cardName = "Queen";
        cardScore = 10;
      }
      if (cardName == 13) {
        cardName = "King";
        cardScore = 10;
      }
      var card = {
        name: cardName,
        score: cardScore,
        suit: currentSuit,
        emoji: currentEmoji,
        image: cardImage,
      };
      cardDeck.push(card);
      cardIndex += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Helper Function 2 - Shuffle Deck Function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

// Helper Function 3 - Deal Card Function - Player
var dealPlayerCard = function (cardDeck) {
  if (gameState == GAME_STATE_DEAL_CARDS) {
    var dealPlayerIndex = 0;
    while (dealPlayerIndex < 2) {
      playerHand.push(cardDeck.pop());
      dealPlayerIndex += 1;
    }
    playerCard = `Player's hand is ${playerHand[0].image} of ${playerHand[0].suit}  ${playerHand[0].emoji} and ${playerHand[1].image} of ${playerHand[1].suit}  ${playerHand[1].emoji}.`;
  } else if (gameState == GAME_STATE_CHOOSE_PLAYER_CHOICE) {
    var playerInitialCardGameMessage = `Player's initial cards are ${playerHand[0].image} of ${playerHand[0].suit}  ${playerHand[0].emoji} and ${playerHand[1].image} of  ${playerHand[1].suit}  ${playerHand[1].emoji}.`;
    playerHand.push(cardDeck.pop());
    dealCardPlayerRound += 1;
    var currentPlayerHand = revealPlayerHand(playerHand);
    var playerCard =
      playerInitialCardGameMessage +
      ` Player was subsequently dealt with the following card this turn: ${playerHand[dealCardPlayerRound].image} of ${playerHand[dealCardPlayerRound].suit}  ${playerHand[dealCardPlayerRound].emoji}.<br><br> Player's current hand is ${currentPlayerHand}.`;
  }
  return playerCard;
};

// Helper Function 4 - Deal Card Function - Computer
var dealComputerCard = function (cardDeck) {
  if (gameState == GAME_STATE_DEAL_CARDS) {
    var dealComputerIndex = 0;
    while (dealComputerIndex < 2) {
      computerHand.push(cardDeck.pop());
      dealComputerIndex += 1;
    }
    computerCard = `Computer's hand is ${computerHand[0].image} of ${computerHand[0].suit}  ${computerHand[0].emoji} and ${computerHand[1].image} of ${computerHand[1].suit}  ${computerHand[1].emoji}.`;
    return computerCard;
  } else if (gameState == GAME_STATE_DEAL_COM_ADD_CARDS) {
    if (computerScore < 17) {
      var dealAddComputerIndex = 0;
      while (dealAddComputerIndex < cardDeck.length) {
        if (computerScore < 17) {
          computerHand.push(cardDeck.pop());
          computeComputerScore(computerHand);
        }
        dealAddComputerIndex += 1;
      }
    } else if (computerScore >= 17) {
      gameState = GAME_STATE_COMPARE_CARDS;
    }
  }
  return computerCard;
};

// Helper Function 5 - Compare Scores Function
// Helper Function 6 - Reset Game Function

// Helper Function 7 - Score Computation Function
// Player Score Computation
var computePlayerScore = function (playerHand) {
  var playerScoreIndex = 0;
  var playerScoreMessage = "";
  playerScore = 0;
  while (playerScoreIndex < playerHand.length) {
    playerScore += playerHand[playerScoreIndex].score;
    playerScoreIndex += 1;
  }
  playerScoreMessage = `Player's current score is ${playerScore}.`;
  return playerScoreMessage;
};
// Computer Score Computation
var computeComputerScore = function (computerHand) {
  var computerScoreIndex = 0;
  var computerScoreMessage = "";
  computerScore = 0;
  while (computerScoreIndex < computerHand.length) {
    computerScore += computerHand[computerScoreIndex].score;
    computerScoreIndex += 1;
  }
  computerScoreMessage = `Computer's current score is ${computerScore}.`;
  return computerScoreMessage;
};

// Helper Function 8 - reveal card hands
var revealPlayerHand = function (playerHand) {
  var playerHandIndex = 0;
  var currentFullPlayerHand = "";
  var currentFullPlayerHandArray = [];
  while (playerHandIndex < playerHand.length) {
    currentFullPlayerHand = `<br> ${playerHand[playerHandIndex].image} of ${playerHand[playerHandIndex].emoji}`;
    currentFullPlayerHandArray.push(currentFullPlayerHand);
    playerHandIndex += 1;
  }
  return currentFullPlayerHandArray;
};

var revealComputerHand = function (computerHand) {
  var computerHandIndex = 0;
  var currentFullComputerHand = "";
  var currentFullComputerHandArray = [];
  while (computerHandIndex < computerHand.length) {
    currentFullComputerHand = `<br> ${computerHand[computerHandIndex].image} of ${computerHand[computerHandIndex].emoji}`;
    currentFullComputerHandArray.push(currentFullComputerHand);
    computerHandIndex += 1;
  }
  return currentFullComputerHandArray;
};

// Main Function

var main = function (input) {
  var gameMessage = "";
  if (gameState == GAME_STATE_START_GAME) {
    // Shuffle Deck
    shuffleDeck(makeDeck());
    gameState = GAME_STATE_DEAL_CARDS;
    return (gameMessage = `The deck has been shuffled. Please press the Submit button to start the game!`);
  }
  // Deal Cards and display Player and Computer Cards
  else if (gameState == GAME_STATE_DEAL_CARDS) {
    var playerCard = dealPlayerCard(cardDeck);
    var computerCard = dealComputerCard(cardDeck);
    currentPlayerScore = computePlayerScore(playerHand);
    currentPlayerScoreNumber = playerScore;
    currentComputerScore = computeComputerScore(computerHand);
    currentComputerScoreNumber = computerScore;
    gameMessage =
      playerCard +
      `<br><br>` +
      currentPlayerScore +
      `<br><br><br>` +
      computerCard +
      `<br><br>` +
      currentComputerScore +
      `<br><br><br><br>` +
      instructionToPlayer;
    gameState = GAME_STATE_CHOOSE_PLAYER_CHOICE;
    return gameMessage;
  }
  // Player chooses to "hit" or "stand"
  else if (gameState == GAME_STATE_CHOOSE_PLAYER_CHOICE) {
    if (!(input == "hit" || input == "stand")) {
      gameMessage =
        'Invalid input! Please type in either "hit" or "stand" to continue playing the game!';
      gameState = GAME_STATE_CHOOSE_PLAYER_CHOICE;
      return gameMessage;
    } else if (input == "hit") {
      var addPlayerCard = dealPlayerCard(cardDeck);
      var currentAddPlayerScore = computePlayerScore(playerHand);
      gameMessage =
        addPlayerCard +
        `<br><br>` +
        currentAddPlayerScore +
        `<br><br><br><br>` +
        instructionToPlayer;
      if (input == "stand") {
        gameMessage = instructionToPlayerChooseStand;
        gameState = GAME_STATE_DEAL_COM_ADD_CARDS;
      }
      return gameMessage;
    } else if (input == "stand") {
      gameMessage = instructionToPlayerChooseStand;
      gameState = GAME_STATE_DEAL_COM_ADD_CARDS;
    }
    return gameMessage;
  } else if (GAME_STATE_DEAL_COM_ADD_CARDS) {
    computerScore = currentComputerScoreNumber;
    dealComputerCard(cardDeck);
    var finalComputerHand = revealComputerHand(computerHand);
    console.log(finalComputerHand);
    gameMessage = `Computer's final hand is ${finalComputerHand}, <br> and Computer's final score is ${computerScore}.`;
    gameState = GAME_STATE_COMPARE_CARDS;
  } else if (GAME_STATE_COMPARE_CARDS) {
    gameMessage = "hello";
  }
  return gameMessage;
};
