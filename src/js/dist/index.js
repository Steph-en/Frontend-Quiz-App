"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// dark mode settings here
function toggle() {
    const theme = document.documentElement.classList.toggle('dark-theme');
    // Store the theme state in local storage
    localStorage.setItem("theme", theme ? 'dark' : 'light');
}
// Function to initialize the theme when the page loads
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }
    else {
        document.documentElement.classList.remove('dark-theme');
    }
}
// Call the initializeTheme function when the page loads
window.onload = initializeTheme;
// Selected Category | Mouse
document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", navigateCategory);
});
// Selected Category | Keyboard
document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("keydown", (event) => {
        navigateCategory(event);
    });
});
// Finding Link to the selected category
function navigateCategory(event) {
    var _a, _b;
    const categoryTarget = event.currentTarget;
    const categoryTitle = (_b = (_a = categoryTarget.querySelector(".categories-titles")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (categoryTitle) {
        categoryTarget.href = `/questions.html?category=${categoryTitle}`;
    }
    switch (categoryTitle) {
        case "html":
            localStorage.setItem("selectedCategory", "html");
            break;
        case "css":
            localStorage.setItem("selectedCategory", "css");
            break;
        case "javascript":
            localStorage.setItem("selectedCategory", "javascript");
            break;
        case "accessibility":
            localStorage.setItem("selectedCategory", "accessibility");
            break;
        default:
            localStorage.setItem("selectedCategory", "unknown");
    }
}
let filteredCategoryQuestions;
let Questions = { quizzes: [] };
// Get quiz data from JSON file
function QuizData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`/src/js/data.json`);
        let request = yield response.json();
        Questions = request;
        const category = localStorage.getItem("selectedCategory");
        switch (category) {
            case "html":
                filteredCategoryQuestions = Questions.quizzes[0];
                break;
            case "css":
                filteredCategoryQuestions = Questions.quizzes[1];
                break;
            case "javascript":
                filteredCategoryQuestions = Questions.quizzes[2];
                break;
            case "accessibility":
                filteredCategoryQuestions = Questions.quizzes[3];
                break;
            default:
                console.log("unknown category");
        }
        return filteredCategoryQuestions;
    });
}
// Getting and setting quiz icon
const Icon = document.getElementById("lesson-icon");
QuizData().then((quizData) => {
    if (Icon && quizData) {
        Icon.src = quizData.icon;
    }
    else {
        console.error("Element with ID 'lesson-icon' not found");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// Icon Background-color
function getLessonIconColor(lesson) {
    switch (lesson) {
        case "html":
            return "#FFF1E9"; // Example color for HTML lessons
        case "css":
            return "#E0FDEF"; // Example color for CSS lessons
        case "javascript":
            return "#EBF0FF"; // Example color for JavaScript lessons
        case "accessibility":
            return "#F6E7FF"; // Example color for Accessibility lessons
        default:
            return "#CCCCCC"; // Default color for other lessons
    }
}
// Function to get URL parameters
function getUrlParameter(name) {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(name);
}
// Get selected lesson from URL parameter
const selectedLesson = getUrlParameter("category");
// Set icon background color based on selected lesson
if (Icon && selectedLesson) {
    Icon.style.backgroundColor = getLessonIconColor(selectedLesson);
}
else {
    console.error("Element with ID 'lesson-icon' not found.");
}
// Getting and setting quiz title
const Title = document.getElementById("lesson-title");
QuizData().then((quizData) => {
    if (Title && quizData) {
        Title.innerHTML = quizData.title;
    }
    else {
        console.error("Element with ID 'lesson-title' not found");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// qtn, optn, qNum && pBar
const Question = document.getElementById("question");
const optionsContainer = document.querySelector('.options');
const options = document.querySelectorAll(".question-content");
const submitButton = document.getElementById("submit");
const nextQuestion = document.getElementById("next");
let currentQuestionIndex = 0;
function displayQuestion(quizData, index) {
    if (Question && optionsContainer && quizData && quizData.questions.length > index) {
        const currentQuestion = quizData.questions[index];
        const questionHTML = `<div class="question">${currentQuestion.question}</div>`;
        Question.innerHTML = questionHTML;
        const questionAns = quizData.questions[index].answer;
        const filteredOptions = quizData.questions[index].options;
        // console.log(filteredOptions);
        // console.log(questionAns);
        const QuestionNumber = document.getElementById('question-num');
        QuizData().then((quizData) => {
            if (QuestionNumber && quizData.questions.length > 0) {
                let questionNum;
                if (index === 9) {
                    questionNum = `<div class="question-num">Question 10 of 10</div>`;
                }
                else {
                    questionNum = `<div class="question-num">Question ${String.fromCharCode(49 + index)} of 10</div>`;
                }
                QuestionNumber.innerHTML = questionNum;
            }
            else {
                console.error("Element with ID 'question-num' not found");
            }
            if (QuestionNumber && quizData.questions.length > 0) {
                const totalQuestions = quizData.questions.length;
                const progressPercentage = ((index + 1) / totalQuestions) * 100;
                const progressBar = document.getElementById('level');
                if (progressBar) {
                    progressBar.style.width = `${progressPercentage}%`;
                }
            }
            else {
                console.error("Element with ID 'question-num' not found");
            }
        }).catch(() => {
            console.error("Error fetching quiz data:");
        });
        let optionHTML = '';
        filteredOptions.forEach((option, index) => {
            optionHTML += `<div class="question-content" tabindex="0" onclick="highLightOption(this)">
            <p class="letter-options">${String.fromCharCode(65 + index)}</p>
            <p class="question-options">${escapeHtml(option)}</p>
            </div>`;
        });
        if (optionsContainer) {
            optionsContainer.innerHTML = optionHTML;
        }
    }
    else {
        console.error("Element with ID 'question' not found");
    }
    if (currentQuestionIndex > 9) {
        console.log("hello");
        window.location.href = "score.html";
    }
}
QuizData().then((quizData) => {
    displayQuestion(quizData, currentQuestionIndex);
}).catch(() => {
    console.error("Error fetching quiz data");
});
// Select function
function selectSingleOption() {
    function handleOptionClick(event) {
        const clickedOption = event.currentTarget;
        options.forEach((option) => {
            if (option !== clickedOption) {
                option.classList.remove("select");
                option.removeEventListener("click", handleOptionClick);
            }
        });
        clickedOption.classList.add("select");
    }
    options.forEach(option => {
        option.addEventListener("click", handleOptionClick);
    });
}
function highLightOption(data) {
    let isSelected = false;
    optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.querySelectorAll('.question-content').forEach((element) => {
        if (element.classList.contains('select')) {
            isSelected = true;
        }
    });
    if (isSelected) {
        return;
    }
    else {
        data.classList.add('select');
    }
}
function isOptionSelected() {
    const selectedOption = optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.querySelector('.question-content.select');
    return selectedOption !== null;
}
function markOptionAsCorrect(quizData) {
    var _a;
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedOptionElement = optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.querySelector('.question-content.select');
    if (selectedOptionElement) {
        const selectedOptionText = ((_a = selectedOptionElement.querySelector('.question-options')) === null || _a === void 0 ? void 0 : _a.textContent) || "";
        const correctAnswer = currentQuestion.answer;
        // Highlight the selected option
        selectedOptionElement.classList.add(selectedOptionText === correctAnswer ? "correct" : "wrong");
        // Find and highlight the correct option
        const correctOptionElement = Array.from(optionsContainer.querySelectorAll('.question-content'))
            .find(element => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === correctAnswer; });
        if (correctOptionElement) {
            correctOptionElement.classList.add("correct");
        }
    }
}
let score = 0;
// Submit button event listener
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", () => {
    if (isOptionSelected()) {
        markOptionAsCorrect(filteredCategoryQuestions);
        toggleSubmitButtonVisibility1();
        updateScore();
    }
    else {
        const ErrorElement = document.querySelector(".error-container");
        if (ErrorElement !== null) {
            ErrorElement.style.display = "block";
        }
    }
});
nextQuestion === null || nextQuestion === void 0 ? void 0 : nextQuestion.addEventListener("click", () => {
    currentQuestionIndex++;
    QuizData().then((quizData) => {
        displayQuestion(quizData, currentQuestionIndex);
        toggleSubmitButtonVisibility();
        hideErrorMessage();
    }).catch(() => {
        console.error("Error fetching quiz data");
    });
});
function toggleSubmitButtonVisibility1() {
    if (submitButton && nextQuestion) {
        submitButton.style.display = "none";
        nextQuestion.style.display = "block";
    }
    else {
        console.error("Submit button not found.");
    }
}
function toggleSubmitButtonVisibility() {
    if (submitButton && nextQuestion) {
        submitButton.style.display = "block";
        nextQuestion.style.display = "none";
    }
    else {
        console.error("Submit button or Next Question button not found.");
    }
}
// Function to hide the error message
function hideErrorMessage() {
    const ErrorElement = document.querySelector(".error-container");
    if (ErrorElement) {
        ErrorElement.style.display = "none"; // Hide the error message
    }
    else {
        // console.error("Error element not found.");
    }
}
// Function to update the score based on the selected option
function updateScore() {
    var _a;
    const selectedOptionElement = optionsContainer === null || optionsContainer === void 0 ? void 0 : optionsContainer.querySelector('.question-content.select');
    const currentQuestion = filteredCategoryQuestions.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
    if (selectedOptionElement) {
        const selectedOptionText = ((_a = selectedOptionElement.querySelector('.question-options')) === null || _a === void 0 ? void 0 : _a.textContent) || "";
        // If the selected option is correct, increment the score
        if (selectedOptionText === correctAnswer) {
            score++;
        }
    }
    // Update the score in the HTML element with class "point"
    const scoreElement = document.querySelector('.point');
    if (scoreElement) {
        scoreElement.innerHTML = score.toString();
    }
}
// Function to reset the score
function resetScore() {
    score = 0;
}
const resetButton = document.getElementById("reset");
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", () => {
    resetScore();
    currentQuestionIndex = 0;
    hideErrorMessage();
    toggleSubmitButtonVisibility();
    const scoreElement = document.querySelector('.point');
    if (scoreElement) {
        scoreElement.innerHTML = "0";
    }
    window.location.href = "index.html";
});
function escapeHtml(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
