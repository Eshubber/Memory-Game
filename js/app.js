/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//This function flips a card when called
function flipCard(card){
		card.classList.add('show','open');
}

//If two cards are a match, this function locks them in the open position
const lock = function(){
	openCards.forEach(function(open){
		open.classList.add('match');
	});
	openCards.length = 0;
	match++;
}

//If two cards are no match, this function flips them back to the closed position
const hide = function(){
	setTimeout(function() {
		openCards.forEach (function(open){
			open.classList.remove('open', 'show');
			});
		openCards.length = 0;
	}, 350);
}


//Whenever called, this function restarts the game
const newSet =  function(){
	shuffle (shuffled);
	s = 0;
	m = 0;
	clearInterval(myWatch);
	timer();
	shuffled.forEach (function(newCard){
		newCard.remove();
		newCard.classList.remove('show', 'open', 'match');
		deck.appendChild(newCard);
		newCard.classList.add('show', 'open');
		setTimeout(function(){
			newCard.classList.remove('show', 'open', 'match');
		}, 3000);
	});
	count = 0;
	moves.textContent = 0;
	openCards.length = 0;
	match = 0;
	stars.forEach(function(star){
		if (!star.classList.contains('fa-star')){
			star.classList.add('fa-star');
		}
	});
}

/* This function takes all the cards in the deck and places them in an array to facilitate  
using the shuffle function.*/
const generateCards = function(){
	cards.forEach(function(card){
		card.remove();
	});
	shuffled.forEach (function(newCard){
		deck.appendChild(newCard);
		setTimeout(function(){
			newCard.classList.remove('show', 'open', 'match');
		}, 3000);
	});
}

//This function keeps track of the time taken during the game
const timer = function(){
    setTimeout(function(){
		myWatch = setInterval(myTimer, 1000);
		const timeCount = document.querySelector('.timer');
		function myTimer() {
			s++;
	    	if(s===60){
	    		s = 0;
	        	m++;
	    	}
	    	timeCount.textContent = "Time: " + m + " min(s) and " + s + " seconds.";
		}
	}, 3000);
}

/*This function displays a modal when all the cards have been matched. The modal displays a message
congratulating the user for winning the game, displaying the star rating, and the time taken to 
win the game*/
const win = function(){
	const modal = document.getElementById('myModal');
	const text = document.querySelector('.modal-text');
	const button = document.querySelector('.button');
	clearInterval (myWatch);
	if (count/2 <= 11){
		text.textContent = "You win with a score of " + count/2+ " moves, 3 stars!!!\nYour times was " + m + " minutes and " + s + " seconds.";
	}

	else if (count/2 <= 14){
		text.textContent = "You win with a score of " + count/2+ " moves, 2 stars.\nYour times was " + m + " minutes and " + s + " seconds.";
	}

	else {
		text.textContent = "You win with a score of " + count/2+ " moves, 1 star.\nYour times was " + m + " minutes and " + s + " seconds.";
	}
	modal.style.display = "block";
	button.onclick = function(){
		newSet();
		modal.style.display = "none";
	}
	window.onclick = function(event) {
  		if (event.target == modal) {
    		modal.style.display = "none";
  		}
	}
}

/*The following varaibles are declared so they are ready for use 
in the above functions. */
const moves = document.querySelector('.moves');
let s = 0;
let m = 0;
let myWatch;
let count = 0;
const cards = document.querySelectorAll('.card');
let shuffled = shuffle(Array.from(cards));
const deck = document.querySelector('.deck');
const openCards = [];
const stars = document.querySelectorAll('.fa-star');
const restart = document.querySelector('.fa-repeat');
let match = 0;

//The timer is called and started
timer();

//Am array of cards is generated
generateCards();
restart.addEventListener('click', newSet);

cards.forEach (function(card){
	card.addEventListener('click', function (){

		if (!card.classList.contains('show')){
			flipCard(card);
			moves.innerText = (++count/2).toFixed(0);
			openCards.push(card);

			if (openCards.length === 2){
				//If two cards are matched, they're locked in the open position
				if (openCards[0].dataset.shape === openCards[1].dataset.shape){
					lock()
					
				}
				//If the two cards are no match, they are hidden
				else{
					hide();
				}
				//After 11 moves, the star rating is decreased to 2.
				if (count/2 >= 11){
					stars[0].classList.remove('fa-star');
				}
				//After 14 moves, the star rating is decreased to 1.
				if (count/2 >= 15){
					stars[0].classList.remove('fa-star');
					stars[1].classList.remove('fa-star');
				}
				//When all cards are matched, the game is over and the win() function is called.
				if (match === 8){
					win();
				}
			}
		}
	});
});







/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
