const quiz = [
    ["airport","aeropuerto"],
    ["interesting","interesante"],
    ["gato","cat"]
];

let score = 0;

for (const [question, answer] of quiz) {
	const response = prompt(question);
	if (response === answer) {
		alert("Correct!");
		score++;
	} else {
		alert(`Wrong! The correct answer was ${answer}`);
	}
}

alert(`Quiz Over, you scored ${score} point${score !== 1 ? 's' : ''}`);

// TODO: chapter 4