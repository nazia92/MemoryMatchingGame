/* 
    Students! You will all be completing this matching card game.
    Follow the directions throughout this file to slowly build out 
    the game's features.
*/


// These are all the symbols that the game is going to use
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
// You're going to need this to display the cards on the screen (remember there should be two of each card)
let cards = [];
// These will be used when the user starts choosing cards
let firstCard = null, secondCard = null;
// You will need to lock the board to stop users from choosing cards when they choose two wrong cards
// (Don't have to worry about this too much)
let lockBoard = false;
let counter = 0;
let start = true;


/* 
    You must initialize the game board. You have been given a shuffleArray() function.
    This function should also reset the entire game board by making sure there's no HTML inside of the game-board div.
    Use the createCard() function to initialize each cardElement and add it to the gameBoard.

*/
function initGame() {
    // Write your code here

  


    counter = 0;
    cards = symbols.concat(symbols); //makes cards a new array with symbols concatated with the second symbol
    shuffleArray(cards);



    const gameBoard = document.getElementById('game-board');
    document.getElementById('score').innerText = "Score: " + counter;
    gameBoard.innerHTML = ''; //clears the board
    
  setTimeout(() => { //creates a 3 second delay before the game even starts
      
      
    for(let i = 0; i < cards.length; i++){ //creates new cards but doesn't show the symbols get because we are doing that in flipcard()
        const symbol = cards[i];
        const cardElement = createCard(symbol);
        gameBoard.appendChild(cardElement);
        firstUnflipCards(cardElement);
    
        
    }
    

       

    resetBoard();
      }, 3000);

    document.getElementById('restart-btn').addEventListener('click', initGame);


}

/*
    The card will have the class 'card' and it would be a good idea to somehow save what its symbol is
    within the element itself, since we'll need it for later and there's no easy way to get it from the arrays.
    Also make sure to add the event listener with the 'flipCard' function
*/
function createCard(symbol) { //this method doesn't actually draw the card it only creates the div for it, metadata I think
    // Write your code here
    const card = document.createElement('div'); //creates an empty <div></div>
    card.classList.add('card'); //adds a class to the card. <div class="card"></div>
    card.dataset.symbol = symbol //adds the dataset property to the elemnt. essentially <div class="card" data-symbol = 'banana'></div> 

    card.textContent = card.dataset.symbol; //this would display the symbols but we will do the next line because we want to flip them
    card.classList.add('starting');


    card.addEventListener('click', () => flipCard(card)); //calling flip card method when clicked

    return card;
}

/*
    This function will handle all the logic for flipping the card. You can check if a variable doesn't
    have a value attached to it or is null by doing if (variable === null) {} or if (variable == null) {} or  if (!variable){}
    If a card get's flipped, add the 'flipped' class and also display the symbol. 
    Also, if this is the first card you picked, then set the firstCard variable to the card you just picked.
    If it's the second, then set the secondCard variable to it. Also, if that's the second card, then you 
    want to check for a match using the checkForMatch() function. 
*/
function flipCard(card) {
    // If the board is supposed to be locked or you picked the same card you already picked
    if (lockBoard || card === firstCard) {
        return;
    }
    // Write your code here
    if(firstCard == null){ //flipping the first card
        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        firstCard = card;

    }

    else{ //first card is already flipped and now we have fliped the second card

        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        secondCard = card;

        checkForMatch();

    }
}

/* 
    If there's a match between the first two cards that you picked, you want to take those cards out of the
    game and then reset the board so that there is firstCard == null and secondCard == null.
    Otherwise, you should unflip the card and continue playing normally.
*/
function checkForMatch() {
    // Write your code here
    
    if(firstCard.dataset.symbol == secondCard.dataset.symbol){
        counter = counter + 5;
        document.getElementById('score').innerText = "Score: " + counter;
        disableCards();

    }
    else{
        counter = counter - 1;
        document.getElementById('score').innerText = "Score: " + counter;
        unflipCards();
        
    }
}

/* 
    Disable both of the cards by adding the "matched" class to them. The "matched" class will add CSS
    properties to make sure that they can no longer be clicked at all. Then use the resetBoard() function
    to reset the firstCard, secondCard, and lockBoard variables. (That's been written for you already)
*/
function disableCards() {
    // Write your code here
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}
 
/* ---------------------  Everything under has already been done for you -------------------------- */

function unflipCards() {

    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function firstUnflipCards(card) {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        card.textContent = '';
        card.classList.remove('starting');
        resetBoard();
    }, 1000);

}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();
