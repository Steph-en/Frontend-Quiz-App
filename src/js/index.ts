function toggle() {
    const theme: any = document.documentElement.classList.toggle('dark-theme');

    // Check if the 'dark-theme' class is currently applied
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');

    // Store the theme state in local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Apply the stored theme when the page loads
window.onload = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }
};

// Interface for Quiz Data
interface QuizData {
    title: string;
    icon: string;
    questions: QuizQuestion[];
}

// Interface for Quiz Question
interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

const Title = document.getElementById("lesson-title") as HTMLHeadingElement;

// Get quiz data from JSON file
// async function QuizData() {
//     let response = await fetch(`/src/js/data.json`);
//     let data = await response.json()
//     return data;
//     Title.innerHTML = `${data.quizzes[0].title}`
// }
// QuizData().then(data => console.log(data.quizzes[0].title))

async function fetchData() {
    try {
        const response = await fetch('/src/js/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayData() {
    const dataContainer = document.getElementById('lesson-title');
    const jsonData = await fetchData();

    // Format the data as needed
    const formattedData = jsonData.map((item: { property: any; }) => `<h3>${item.property}</h3>`).join('');

    // Update the container with the formatted data
    dataContainer.innerHTML = formattedData;
}

displayData();

// async function displayQuizData() {
//     try {
//         const response = await fetch('/src/js/data.json');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         const lessonTitleElement = document.getElementById('currentQuestion'); // Get reference to the target element

//         if (lessonTitleElement) { // Check if element exists before modifying
//             lessonTitleElement.textContent = data.quizzes[0].questions[0].question; // Set text content using textContent for better security
//         } else {
//             console.warn('Element with ID "lesson-title" not found.'); // Inform user if element is missing
//         }
//     } catch (error) {
//         console.error('Error fetching quiz data:', error); // Handle potential errors
//     }
// }

// displayQuizData();
