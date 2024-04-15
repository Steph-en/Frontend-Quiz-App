function toggle() {
    document.documentElement.classList.toggle('dark-theme');

    const sunIcon = document.getElementById('sunIcon') as HTMLImageElement;
    const moonIcon = document.getElementById('moonIcon') as HTMLImageElement;

    // Toggle the src attribute of the images
    if (sunIcon.src.includes('dark')) {
        sunIcon.src = './assets/images/icon-sun-light.svg';
        moonIcon.src = './assets/images/icon-moon-light.svg';
    } else {
        sunIcon.src = './assets/images/icon-sun-dark.svg';
        moonIcon.src = './assets/images/icon-moon-dark.svg';
    }
}

interface Quiz {
    quizzes: {
        
    }
}