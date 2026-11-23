
const questions = [
    {
        question: "Which language is used to structure web pages?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["let", "print", "display", "echo"],
        answer: "let"
    },
    {
        question: "Which company developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        answer: "Sun Microsystems"
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Tree", "Queue", "Graph"],
        answer: "Queue"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const countElement = document.getElementById("question-count");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    countElement.textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;
    feedbackElement.textContent = "";
    optionsElement.innerHTML = "";

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    nextButton.disabled = true;

    q.options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(option, button);

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selected, selectedButton) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selected === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct answer! Well done!";
    } else {
        selectedButton.classList.add("wrong");
        feedbackElement.textContent =
            `Incorrect! Correct answer: ${correctAnswer}`;
    }

    scoreElement.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz-card").classList.add("hidden");
    document.getElementById("result-card").classList.remove("hidden");

    document.getElementById("final-score").textContent =
        `${score}/${questions.length}`;

    document.getElementById("result-message").textContent =
        score >= 4 ? "Excellent work!" :
        score >= 2 ? "Good effort! Keep learning." :
        "Keep practicing. You can do it!";
}

document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    document.getElementById("result-card").classList.add("hidden");
    document.getElementById("quiz-card").classList.remove("hidden");

    loadQuestion();
});

loadQuestion();
