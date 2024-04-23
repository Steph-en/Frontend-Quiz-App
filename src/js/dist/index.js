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
    // Check if the 'dark-theme' class is currently applied
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');
    // Store the theme state in local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
let Questions = { quizzes: [] };
// Selected Category;
document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", navigateCategory);
});
document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("keydown", function (event) {
        navigateCategory(event);
    });
});
// Finding Link to the selected category
function navigateCategory(event) {
    var _a, _b;
    const categoryTarget = event.currentTarget;
    const categoryTitle = (_b = (_a = categoryTarget
        .querySelector(".categories-titles")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (categoryTitle) {
        categoryTarget.href = `./questions.html?category=${categoryTitle}`;
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
// Select function
function selectSingleOption() {
    const Options = document.querySelectorAll(".question-content");
    function handleOptionClick(event) {
        const clickedOption = event.currentTarget;
        Options.forEach(option => {
            if (option !== clickedOption) {
                option.removeEventListener("click", handleOptionClick);
            }
        });
        clickedOption.classList.add("select");
    }
    Options.forEach(option => {
        option.addEventListener("click", handleOptionClick);
    });
}
selectSingleOption();
let filteredCategoryQuestions;
// Get quiz data from JSON file
function QuizData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`/src/js/data.json`);
        let data = yield response.json();
        Questions = data;
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
QuizData();
// Getting and setting quiz title
const Title = document.getElementById("lesson-title");
QuizData().then(quizData => {
    console.log("Quiz Data:", quizData);
    if (Title && quizData) {
        const quizTitle = quizData.title;
        Title.innerHTML = quizTitle;
    }
    else {
        console.error("Element with ID 'lesson-title' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// Getting and setting quiz icon
const Icon = document.getElementById("lesson-icon");
QuizData().then(quizData => {
    console.log("Quiz Data:", quizData);
    if (Icon && quizData) {
        const quizIconSrc = quizData.icon;
        Icon.src = quizIconSrc;
    }
    else {
        console.error("Element with ID 'lesson-icon' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
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
const Icons = document.getElementById("lesson-icon");
if (Icons && selectedLesson) {
    Icons.style.backgroundColor = getLessonIconColor(selectedLesson);
}
else {
    console.error("Element with ID 'lesson-icon' not found or no lesson selected.");
}
// Getting and setting quiz questions
const Question = document.getElementById("question");
QuizData().then(quizData => {
    console.log("Quiz Data:", quizData);
    if (Question && quizData) {
        let questionsHTML = "";
        quizData.questions.forEach(question => {
            questionsHTML += `<div class="question">${question.question}</div>`;
            // You can append options and other question details here as needed
        });
        Question.innerHTML = questionsHTML;
    }
    else {
        console.error("Element with ID 'question' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});
