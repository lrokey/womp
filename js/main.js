const quiz = [
	{english: "airport", spanish: "aeropuerto"},
	{english: "interesting", spanish: "interesante"},
	{english: "cat", spanish: "gato"}
];

// view object
const view = {
	score: document.querySelector("#score strong"),
	question: document.getElementById("question"),
	response: document.querySelector("#response"),
	result: document.getElementById("result"),
	info: document.getElementById("info"),
	start: document.getElementById("start"),
	timer: document.querySelector("#timer strong"),
	render(target, content, attributes) {
		for (const key in attributes) {
			target.setAttribute(key, attributes[key]);
		}
		target.innerHTML = content;
	},
	show(element) {
		element.style.display = "block";
	},
	hide(element) {
		element.style.display = "none";
	},
	setup(){
		this.show(this.question);
		this.show(this.response);
		this.show(this.result);
		this.hide(this.start);
		this.render(this.score, game.score);
		this.render(this.result, "");
		this.render(this.info, "");
		this.resetForm();
	},
	resetForm(){
		this.response.answer.value = "";
		this.response.answer.focus();
	},
	teardown(){
		this.hide(this.question);
		this.hide(this.response);
		this.show(this.start);
	}
};

const game = {
	start(quiz) {
		console.log("Start() invoked");
		this.questions = [...quiz];
		this.score = 0;
		console.log("setting secondsRemaining to 0");
		this.secondsRemaining = 20;
		this.timer = setInterval(this.countdown, 1000);
		view.setup();
		this.ask();
	},

	ask(name) {
		console.log("ask() invoked");
		if (this.questions.length > 0) {
			this.question = this.questions.pop();
			const question = `What is ${this.question.english} in Spanish?`;
			view.render(view.question, question);
		} else {
			this.gameOver();
		}
	},

	check(event) {
		console.log("check(event) invoked");
		event.preventDefault();
		const response = view.response.answer.value;
		const answer = this.question.spanish;
		if (response === answer) {
			view.render(view.result, "Correct!", {"class": "correct"});
			this.score++;
			view.render(view.score, this.score);
		} else {
			view.render(view.result, `Wrong! The correct answer was ${answer}`, {"class": "wrong"});
		}
		view.resetForm();
		this.ask();
	},
	countdown() {
		game.secondsRemaining--;
		view.render(view.timer, game.secondsRemaining);
		if (game.secondsRemaining < 0) {
			game.gameOver();
		}
	},
	gameOver() {
		console.log("gameOver() invoked");
		view.render(view.info, `Quiz Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
		this.secondsRemaining = 20;
		clearInterval(this.timer);
		view.teardown();
		
	}
}

view.start.addEventListener("click", () => game.start(quiz), false);
view.response.addEventListener('submit', (event) => game.check(event), false);
view.hide(view.response);

// TODO: 