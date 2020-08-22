import React, {useEffect, useState} from "react";
import {v4 as uuid4} from "uuid"
import cardImages from "../../components/cards";
import Card from "../../components/Card/Card";
import deepcopy from "deepcopy";

function shuffleArray(array) {
	return array.sort(() => .5 - Math.random());
}

const generateCards = (count) => {
	if (count % 2 !== 0) throw "Must be an even count";

	const cards = shuffleArray(cardImages)
		.slice(0, count / 2)
		.map((imageURL) => ({
			id: uuid4(),
			imageURL: "static/images/cards/" + imageURL,
			isFlipped: false,
			canFlip: true
		}))
		.flatMap((element) => [element, {...deepcopy(element), id: uuid4()}]);

	return shuffleArray(cards)
}

const Game = ({ fieldWidth = 3, fieldHeight = 5 }) => {
	const totalCards = fieldWidth * fieldHeight;

	const [cards, setCards] = useState(generateCards(totalCards));
	const [canFlip, setCanFlip] = useState(false);
	const [firstCard, setFirstCard] = useState(null);
	const [secondCard, setSecondCard] = useState(null);

	const setCardIsFlipped = (cardID, isFlipped) => {
		setCards((prev) => prev.map((card) => {
			if (card.id !== cardID) return card;
			return {...card, isFlipped}
		}))
	};
	const setCardCanFlip = (cardID, canFlip) => {
		setCards((prev) => prev.map((card) => {
			if (card.id !== cardID) return card;
			return {...card, canFlip}
		}))
	};

	useEffect(() => {
		setTimeout(() => {
			let idx = 0;
			for (const card of cards) {
				setTimeout(() => setCardIsFlipped(card.id, true), idx++ * 100)
			}
			setTimeout(() => setCanFlip(true), cards.length * 100);
		}, 2000);
	},  []);

	const resetCards = () => {
		setFirstCard(null);
		setSecondCard(null);
	};

	const onSuccessGuess = () => {
		setCardCanFlip(firstCard.id, false);
		setCardCanFlip(secondCard.id, false);
		setCardIsFlipped(firstCard.id, false);
		setCardIsFlipped(secondCard.id, false);
		resetCards()
	};
	const onFailureGuess = () => {
		const firstCardID = firstCard.id;
		const secondCardID = secondCard.id;

		setTimeout(() => {
			setCardIsFlipped(firstCardID, true);
		}, 1000);
		setTimeout(() => {
			setCardIsFlipped(secondCardID, true);
		}, 1500);

		resetCards();
	};

	useEffect(() => {
		if (!firstCard || !secondCard) return;

		(firstCard.imageURL === secondCard.imageURL)? onSuccessGuess(): onFailureGuess();
	}, [firstCard, secondCard]);

	const handleClick = (card) => {
		if (!canFlip) return;
		if (!card.canFlip) return;


		if ((firstCard && (card.id === firstCard.id) || (secondCard && (card.id === secondCard.id)))) return;

		setCardIsFlipped(card.id, false);

		(firstCard)? setSecondCard(card): setFirstCard(card)
	};

	return <div className="game container-md">
		<div className="cards-container">
			{cards.map((card) => <Card onClick={() => handleClick(card)} key={card.id} {...card}/>)}
		</div>
	</div>
};

export default Game;