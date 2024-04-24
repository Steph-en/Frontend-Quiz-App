// dark mode settings here
function toggle() {
    const theme: boolean = document.documentElement.classList.toggle('dark-theme');

    // Check if the 'dark-theme' class is currently applied
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');

    // Store the theme state in local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

interface QuestionType {
    quizzes: Array<{
        title: string;
        icon: string;
        questions: Array<{
            question: string;
            options: Array<string>;
            answer: string;
        }>;
    }>;
}

interface Quiz {
    title: string;
    icon: string;
    questions: Array<{
        question: string;
        options: Array<string>;
        answer: string;
    }>;
}

interface Questions {
    question: string;
    options: Array<string>;
    answer: string;
}

let Questions: QuestionType = { quizzes: [] };

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
function navigateCategory(event: Event | KeyboardEvent) {
    const categoryTarget = event.currentTarget as HTMLAnchorElement;
    const categoryTitle = categoryTarget
        .querySelector(".categories-titles")
        ?.textContent?.toLowerCase();

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
    const Options = document.querySelectorAll<HTMLElement>(".question-content");

    function handleOptionClick(event: Event) {
        const clickedOption = event.currentTarget as HTMLElement;
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

let filteredCategoryQuestions: Quiz;

// Get quiz data from JSON file
async function QuizData() {
    let response = await fetch(`/src/js/data.json`);
    let data = await response.json()
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
}
QuizData()

// Getting and setting quiz title
const Title = document.getElementById("lesson-title");

QuizData().then(quizData => {
    console.log("Quiz Data:", quizData);
    if (Title && quizData) {
        const quizTitle = quizData.title;
        Title.innerHTML = quizTitle;
    } else {
        console.error("Element with ID 'lesson-title' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});

// Getting and setting quiz icon
const Icon = document.getElementById("lesson-icon") as HTMLImageElement;

QuizData().then(quizData => {
    console.log("Quiz Data:", quizData);
    if (Icon && quizData) {
        const quizIconSrc = quizData.icon;
        Icon.src = quizIconSrc;
    } else {
        console.error("Element with ID 'lesson-icon' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});

// Function to get URL parameters
function getUrlParameter(name: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Icon Background-color
function getLessonIconColor(lesson: string) {
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
const Icons = document.getElementById("lesson-icon") as HTMLImageElement;
if (Icons && selectedLesson) {
    Icons.style.backgroundColor = getLessonIconColor(selectedLesson);
} else {
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
    } else {
        console.error("Element with ID 'question' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});

