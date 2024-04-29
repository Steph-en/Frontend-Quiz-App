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
toggle();
QuizData();
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
QuizData().then(quizData => {
    if (Icon && quizData) {
        Icon.src = quizData.icon;
    }
    else {
        console.error("Element with ID 'lesson-icon' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// Function to get URL parameters
function getUrlParameter(name) {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(name);
}
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
// Get selected lesson from URL parameter
const selectedLesson = getUrlParameter("category");
// Set icon background color based on selected lesson
if (Icon && selectedLesson) {
    Icon.style.backgroundColor = getLessonIconColor(selectedLesson);
}
else {
    console.error("Element with ID 'lesson-icon' not found or no lesson selected.");
}
// Getting and setting quiz title
const Title = document.getElementById("lesson-title");
QuizData().then((quizData) => {
    if (Title && quizData) {
        Title.innerHTML = quizData.title;
    }
    else {
        console.error("Element with ID 'lesson-title' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// qtn, optn, qNum && pBar
const Question = document.getElementById("question");
const submitButton = document.querySelector(".submit");
const optionsContainer = document.querySelector('.options');
let currentQuestionIndex = 0;
function displayQuestion(quizData, index) {
    if (Question && optionsContainer && quizData && quizData.questions.length > index) {
        const currentQuestion = quizData.questions[index];
        const questionHTML = `<div class="question">${currentQuestion.question}</div>`;
        Question.innerHTML = questionHTML;
        const filteredOptions = quizData.questions[index].options;
        // console.log(filteredOptions);
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
                console.error("Element with ID 'question-num' not found or no quiz data found.");
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
                console.error("Element with ID 'question-num' not found or no quiz data found.");
            }
        }).catch(() => {
            console.error("Error fetching quiz data:");
        });
        const optionsContainer = document.querySelector('.options');
        let optionHTML = '';
        filteredOptions.forEach((option, index) => {
            optionHTML += `<div class="question-content select" tabindex="0">
            <p class="letter-options">${String.fromCharCode(65 + index)}</p>
            <p class="question-options">${escapeHtml(option)}</p>
            </div>`;
        });
        if (optionsContainer) {
            optionsContainer.innerHTML = optionHTML;
        }
    }
    else {
        console.error("Element with ID 'question' not found, no quiz data found, or no questions available.");
    }
}
QuizData().then((quizData) => {
    displayQuestion(quizData, currentQuestionIndex);
}).catch(() => {
    console.error("Error fetching quiz data:");
});
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", () => {
    currentQuestionIndex++;
    QuizData().then((quizData) => {
        displayQuestion(quizData, currentQuestionIndex);
    }).catch(() => {
        console.error("Error fetching quiz data:");
    });
});
// Select function
function selectSingleOption(optionHTML) {
    const options = document.querySelectorAll(".question-content");
    function handleOptionClick(event) {
        const clickedOption = event.currentTarget;
        options.forEach((option) => {
            if (option !== clickedOption) {
                option.classList.remove("select");
                option.removeEventListener("click", handleOptionClick);
            }
        });
        clickedOption.classList.add("select");
        console.log(clickedOption);
    }
    options.forEach(option => {
        option.addEventListener("click", handleOptionClick);
    });
}
function escapeHtml(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
// dark mode settings here
function toggle() {
    const theme = document.documentElement.classList.toggle('dark-theme');
    // Check if the 'dark-theme' class is currently applied
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');
    // Store the theme state in local storage
    localStorage.setItem("theme", isDarkTheme ? 'dark' : 'light');
}
