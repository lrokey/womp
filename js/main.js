const quiz = [
	{english: "airport", spanish: "aeropuerto"},
	{english: "interesting", spanish: "interesante"},
	{english: "cat", spanish: "gato"}
];

const game = {
	start(quiz) {
		this.questions = [...quiz];
		this.score = 0;

		// main game loop
		for (const question of this.questions) {
			this.question = question;
			this.ask();
		}

		// end of main game loop
		this.gameOver();
	},

	ask() {
		const question = `What is ${this.question.english} in Spanish?`;
		const response = prompt(question);
		this.check(response);
	},

	check(response) {
		const answer = this.question.spanish
		if (response === answer) {
			alert("Correct!");
			this.score++;
		} else {
			alert(`Wrong! The correct answer was ${answer}`);
		}
	},

	gameOver() {
		alert(`Quiz Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
	}
}
game.start(quiz);