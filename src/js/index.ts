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
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}

// Call the initializeTheme function when the page loads
window.onload = initializeTheme;

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

QuizData().then((quizData) => {
    if (Icon && quizData) {
        Icon.src = quizData.icon;
    } else {
        console.error("Element with ID 'lesson-icon' not found");
    }
}).catch(() => {
    console.error("Error fetching quiz data:");
});

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

// Function to get URL parameters
function getUrlParameter(name: string): string | null {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(name);
}

// Get selected lesson from URL parameter
const selectedLesson = getUrlParameter("category");

// Set icon background color based on selected lesson
if (Icon && selectedLesson) {
    Icon.style.backgroundColor = getLessonIconColor(selectedLesson);
} else {
    console.error("Element with ID 'lesson-icon' not found.");
}

// Getting and setting quiz title
const Title = document.getElementById("lesson-title") as HTMLParagraphElement;

QuizData().then((quizData) => {
    if (Title && quizData) {
        Title.innerHTML = quizData.title;
    } else {
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

function displayQuestion(quizData: Quiz, index: number) {
    if (Question && optionsContainer && quizData && quizData.questions.length > index) {
        const currentQuestion = quizData.questions[index];
        const questionHTML = `<div class="question">${currentQuestion.question}</div>`;
        Question.innerHTML = questionHTML;

        const filteredOptions = quizData.questions[index].options;

        const QuestionNumber = document.getElementById('question-num')
        QuizData().then((quizData) => {
            if (QuestionNumber && quizData.questions.length > 0) {
                let questionNum;
                if (index === 9) {
                    questionNum = `<div class="question-num">Question 10 of 10</div>`;
                } else {
                    questionNum = `<div class="question-num">Question ${String.fromCharCode(49 + index)} of 10</div>`;
                }
                QuestionNumber.innerHTML = questionNum;
            } else {
                console.error("Element with ID 'question-num' not found");
            }

            if (QuestionNumber && quizData.questions.length > 0) {
                const totalQuestions = quizData.questions.length;
                const progressPercentage = ((index + 1) / totalQuestions) * 100;
                const progressBar = document.getElementById('level');
                if (progressBar) {
                    progressBar.style.width = `${progressPercentage}%`;
                }
            } else {
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
            optionsContainer.innerHTML = optionHTML
        }
    } else {
        console.error("Element with ID 'question' not found");
    }
}

QuizData().then((quizData) => {
    displayQuestion(quizData, currentQuestionIndex);
}).catch(() => {
    console.error("Error fetching quiz data");
});

// Select function
function selectSingleOption() {
    function handleOptionClick(event: Event) {
        const clickedOption = event.currentTarget as HTMLElement;
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

function highLightOption(data: HTMLElement) {
    let isSelected = false;

    optionsContainer?.querySelectorAll('.question-content').forEach((element) => {
        if (element.classList.contains('select')) {
            isSelected = true;
        }
    });
    if (isSelected) {
        return
    } else {
        data.classList.add('select')
    }
}

submitButton?.addEventListener("click", () => {
    currentQuestionIndex++;
    QuizData().then((quizData) => {
        displayQuestion(quizData, currentQuestionIndex);
    }).catch(() => {
        console.error("Error fetching quiz data:");
    });
});

function escapeHtml(html: string): string {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}