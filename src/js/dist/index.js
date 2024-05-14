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
const submitButton = document.querySelector(".submit");
let currentQuestionIndex = 0;
function displayQuestion(quizData, index) {
    if (Question && optionsContainer && quizData && quizData.questions.length > index) {
        const currentQuestion = quizData.questions[index];
        const questionHTML = `<div class="question">${currentQuestion.question}</div>`;
        Question.innerHTML = questionHTML;
        // const questionAns = quizData.questions[index].answer
        const filteredOptions = quizData.questions[index].options;
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
    // Check if there is any option with the 'select' class
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
        // Find the option element that contains the correct answer text
        const correctOptionElement = Array.from(optionsContainer.querySelectorAll('.question-content'))
            .find(element => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === correctAnswer; });
        // If the selected option's text matches the correct answer's text
        if (selectedOptionText === correctAnswer) {
            selectedOptionElement.classList.add("correct");
        }
        else {
            // Option selected is incorrect
            selectedOptionElement.classList.add("incorrect"); // You may want to add this class for styles indicating incorrect choice
        }
        if (correctOptionElement && !correctOptionElement.classList.contains("correct")) {
            // Additionally mark the correct option if the user's choice was incorrect.
            correctOptionElement.classList.add("correct");
        }
    }
}
// Submit button event listener
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", () => {
    // Use 'isOptionSelected()' to check if any option has been selected.
    if (isOptionSelected()) {
        // Pass quizData as parameter
        markOptionAsCorrect(filteredCategoryQuestions);
        // If an option is selected, hide the error message (if it was shown), proceed to the next question.
        currentQuestionIndex++;
        QuizData().then((quizData) => {
            displayQuestion(quizData, currentQuestionIndex);
            // Ensure no option is marked as selected when moving to the next question.
            options.forEach(option => option.classList.remove("select"));
            // Optionally, hide the error message here if it was previously shown.
            const ErrorElement = document.querySelector(".error-container");
            if (ErrorElement !== null) {
                ErrorElement.style.display = "none"; // Hide error message once an option is selected and moving on.
            }
        }).catch(() => {
            console.error("Error fetching quiz data");
        });
    }
    else {
        // If no option is selected, display the error message prompting the user to select an option.
        const ErrorElement = document.querySelector(".error-container");
        if (ErrorElement !== null) {
            ErrorElement.style.display = "block"; // Show the error message.
        }
    }
});
function escapeHtml(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
