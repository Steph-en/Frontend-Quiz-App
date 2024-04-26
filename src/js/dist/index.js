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
QuizData();
// dark mode settings here
function toggle() {
    const theme = document.documentElement.classList.toggle('dark-theme');
    // Check if the 'dark-theme' class is currently applied
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');
    // Store the theme state in local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
// Select function
function selectSingleOption() {
    const Optn = document.querySelectorAll(".question-content");
    function handleOptionClick(event) {
        const clickedOption = event.currentTarget;
        Optn.forEach(option => {
            if (option !== clickedOption) {
                option.removeEventListener("click", handleOptionClick);
            }
        });
        clickedOption.classList.add("select");
    }
    Optn.forEach(option => {
        option.addEventListener("click", handleOptionClick);
    });
}
selectSingleOption();
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
// Getting and setting quiz questions
const Question = document.getElementById("question");
QuizData().then((quizData) => {
    if (Question && quizData && quizData.questions.length > 0) {
        const firstQuestion = quizData.questions[0]; // Get the first question
        const questionHTML = `<div class="question">${firstQuestion.question}</div>`;
        Question.innerHTML = questionHTML;
    }
    else {
        console.error("Element with ID 'question' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// Dispaly the options dynamically
let Optn;
let filteredOptions;
function QuizOption() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/src/js/data.json`);
            const request = yield response.json();
            Optn = request;
            console.log(`Options`, Optn);
            const category = localStorage.getItem("selectedCategory");
            switch (category) {
                case "html":
                    filteredOptions = Optn.quizzes[0].questions[0].options;
                    break;
                case "css":
                    filteredOptions = Optn.quizzes[1].questions[0].options;
                    break;
                case "javascript":
                    filteredOptions = Optn.quizzes[2].questions[0].options;
                    break;
                case "accessibility":
                    filteredOptions = Optn.quizzes[3].questions[0].options;
                    break;
                default:
                    console.log("Unknown category");
            }
            console.log("Filtered options:", filteredOptions);
            return filteredOptions;
        }
        catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    });
}
