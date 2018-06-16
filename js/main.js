const quiz = [
    ["airport","aeropuerto"],
    ["interesting","interesante"],
    ["gato","cat"]
];

function play(quiz) {
	let score = 0;

	// main game loop
	for (const [question, answer] of quiz) {
		const response = ask(question);
		check(response, answer);
	}
	// end of main game loop

	gameOver();

	// function declarations
	function ask(question) {
		return prompt(question);
	}

	function check(response, answer) {
		if (response === answer) {
			alert("Correct!");
			score++;
		} else {
			alert(`Wrong! The correct answer was ${answer}`);
		}
	}

	function gameOver() {
		alert(`Quiz Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
	}
}

play(quiz);