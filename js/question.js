function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("Is Python case sensitive when dealing with identifiers?", ["yes", "no","machine dependent", "none of the mentioned"], "yes"),
    new Question("What is the maximum possible length of an identifier?", ["31 characters", "63 characters", "79 characters", "none of the mentioned"], "none of the mentioned"),
    new Question("Which of the following is invalid?", ["_a = 1", "__a = 1","__str__ = 1", "none of the mentioned"], "none of the mentioned"),
    new Question("Which of the following is an invalid variable?", ["my_string_1", "1st_string", "foo", "_"], "1st_string"),
    new Question("Why are local variable names beginning with an underscore discouraged?", ["they are used to indicate a private variables of a class", "they confuse the interpreter", "they are used to indicate global variables", " they slow down execution"], "they are used to indicate a private variables of a class")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
