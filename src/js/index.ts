QuizData()

// dark mode settings here
function toggle() {
    const theme: boolean = document.documentElement.classList.toggle('dark-theme');

    // Check if the 'dark-theme' class is currently applied
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');

    // Store the theme state in local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Select function
function selectSingleOption() {
    const Optn = document.querySelectorAll<HTMLElement>(".question-content");

    function handleOptionClick(event: Event) {
        const clickedOption = event.currentTarget as HTMLElement;
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
function navigateCategory(event: Event | KeyboardEvent) {
    const categoryTarget = event.currentTarget as HTMLAnchorElement;
    const categoryTitle = categoryTarget.querySelector(".categories-titles")?.textContent?.toLowerCase();

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

let filteredCategoryQuestions: Quiz;
let Questions: QuestionType = { quizzes: [] };

// Get quiz data from JSON file
async function QuizData() {
    let response = await fetch(`/src/js/data.json`);
    let request = await response.json()

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
}

// Getting and setting quiz icon
const Icon = document.getElementById("lesson-icon") as HTMLImageElement;

QuizData().then(quizData => {
    if (Icon && quizData) {
        Icon.src = quizData.icon;
    } else {
        console.error("Element with ID 'lesson-icon' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});

// Function to get URL parameters
function getUrlParameter(name: string): string | null {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(name);
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
if (Icon && selectedLesson) {
    Icon.style.backgroundColor = getLessonIconColor(selectedLesson);
} else {
    console.error("Element with ID 'lesson-icon' not found or no lesson selected.");
}

// Getting and setting quiz title
const Title = document.getElementById("lesson-title") as HTMLParagraphElement;

QuizData().then((quizData: Quiz) => {
    if (Title && quizData) {
        Title.innerHTML = quizData.title;
    } else {
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
    } else {
        console.error("Element with ID 'question' not found or no quiz data found.");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});

// Dispaly the options dynamically
let Optn;
let filteredOptions: Array<string>;

async function QuizOption() {
    try {
        const response = await fetch(`/src/js/data.json`);
        const request = await response.json();

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
    } catch (error) {
        console.error("Error fetching quiz data:", error);
    }
}
