var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function toggle() {
    var theme = document.documentElement.classList.toggle('dark-theme');
    // Check if the 'dark-theme' class is currently applied
    var isDarkTheme = document.documentElement.classList.contains('dark-theme');
    // Store the theme state in local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
// Apply the stored theme when the page loads
window.onload = function () {
    var storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }
};
var Title = document.getElementById("lesson-title");
// Get quiz data from JSON file
// async function QuizData() {
//     let response = await fetch(`/src/js/data.json`);
//     let data = await response.json()
//     return data;
//     Title.innerHTML = `${data.quizzes[0].title}`
// }
// QuizData().then(data => console.log(data.quizzes[0].title))
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/src/js/data.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayData() {
    return __awaiter(this, void 0, void 0, function () {
        var dataContainer, jsonData, formattedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataContainer = document.getElementById('lesson-title');
                    return [4 /*yield*/, fetchData()];
                case 1:
                    jsonData = _a.sent();
                    formattedData = jsonData.map(function (item) { return "<h3>" + item.property + "</h3>"; }).join('');
                    // Update the container with the formatted data
                    dataContainer.innerHTML = formattedData;
                    return [2 /*return*/];
            }
        });
    });
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
