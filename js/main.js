const cards = document.querySelectorAll('.memory-card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
	if (lockBoard) return
	if (this === firstCard) return

	this.classList.add('flip')

	if (!hasFlippedCard) {
		hasFlippedCard = true
		firstCard = this
		return
	}

	secondCard = this

	checkForMatch()
}

function checkForMatch() {
	isMatch = firstCard.dataset.framework === secondCard.dataset.framework
	isMatch ? disableCards() : unflipsCards()
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard)
	secondCard.removeEventListener('click', flipCard)

	resetBoard()
}

function unflipsCards() {
	lockBoard = true;

	setTimeout( () => {
		firstCard.classList.remove('flip')
		secondCard.classList.remove('flip')

		resetBoard()
	}, 1000)
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false]; 
	//HERE it is COMPLETELY necessary to use ;
	[firstCard, secondCard] = [null, null]
}

(function shuffle() {
	cards.forEach( card => {
		let ramdomPos = Math.floor(Math.random() * 12)
		card.style.order = ramdomPos
	})
})()

cards.forEach( card => card.addEventListener('click', flipCard) )