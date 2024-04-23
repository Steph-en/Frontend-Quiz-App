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
        console.log("Select single option activated");
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
        console.log(filteredCategoryQuestions);
    return filteredCategoryQuestions;
}
QuizData()

