const quiz = [
	{english: "airport", spanish: "aeropuerto"},
	{english: "interesting", spanish: "interesante"},
	{english: "cat", spanish: "gato"},
	{english: "dog", spanish: "perro"},
	{english: "red", spanish: "rojo"},
	{english: "milk", spanish: "leche"}
];

// helper functions
function random(a, b=1) {
	// if only 1 argument is provided, we need to swap the values of a and b
	if (b === 1) {
		[a, b] = [b, a];
	}
	return Math.floor((b-a + 1) * Math.random()) + a;
}

function shuffle(array) {
	// iterate backwards through array
	for(let i = array.length; i; i--){
		// select a random element to swap with
		let j = random(i) - 1;
		[array[i-1], array[j]] = [array[j], array[i-1]];
	}
}

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
	buttons(array) {
		return array.map(value => `<button>${value}</button>`).join(" ");
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
		if (this.questions.length > 2) {
			shuffle(this.questions);
			this.question = this.questions.pop();
			const options = [this.questions[0].spanish, this.questions[1].spanish, this.question.spanish];
			shuffle(options);
			const question = `What is ${this.question.english} in Spanish?`;
			view.render(view.question, question);
			view.render(view.response, view.buttons(options));
		} else {
			this.gameOver();
		}
	},

	check(event) {
		console.log("check(event) invoked");
		const response = event.target.textContent;
		const answer = this.question.spanish;
		if (response === answer) {
			view.render(view.result, "Correct!", {"class": "correct"});
			this.score++;
			view.render(view.score, this.score);
		} else {
			view.render(view.result, `Wrong! The correct answer was ${answer}`, {"class": "wrong"});
		}
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
view.response.addEventListener("click", (event) => game.check(event), false);

// TODO: AJAX