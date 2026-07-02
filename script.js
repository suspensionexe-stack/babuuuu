// Function to create a small floating element
function createFloatingItem(container) {
    const types = ['💖', '✨', '⭐', '🌸', '🤍'];
    const item = document.createElement('div');
    item.className = 'small-item floating-element';
    item.innerText = types[Math.floor(Math.random() * types.length)];
    item.style.position = 'absolute';
    item.style.fontSize = `${1 + Math.random()}rem`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.left = `${Math.random() * 100}%`;
    item.style.opacity = Math.random();
    item.style.pointerEvents = 'none';
    item.style.zIndex = -1;
    item.style.animation = `bounce ${2 + Math.random() * 2}s infinite, floatTiny ${1 + Math.random()}s infinite`;
    container.appendChild(item);
}

// NEW: Magic Word-by-Word Animation
function animateText(screenId) {
    const screen = document.getElementById(screenId);
    const textElements = screen.querySelectorAll('h1, h2, p');
    let totalWordCount = 0;

    textElements.forEach(el => {
        if (el.dataset.animated) return; // Don't animate twice
        
        let html = el.innerHTML;
        // Keep the line breaks intact
        html = html.replace(/<br\s*\/?>/gi, ' ♥BR♥ '); 
        
        let words = html.split(/\s+/);
        let newHtml = '';
        
        words.forEach(word => {
            if (word === '♥BR♥') {
                newHtml += '<br>';
            } else if (word.trim() !== '') {
                // 0.1 seconds delay per word makes it feel like natural reading
                newHtml += `<span class="word" style="animation-delay: ${totalWordCount * 0.1}s">${word}</span> `;
                totalWordCount++;
            }
        });
        
        el.innerHTML = newHtml;
        el.dataset.animated = 'true';
    });
    
    // Hide buttons until all words have appeared
    const buttonGroup = screen.querySelector('.buttons, button');
    if (buttonGroup) {
        buttonGroup.style.opacity = '0';
        buttonGroup.style.animation = `fadeInBtn 1s ease forwards ${totalWordCount * 0.1 + 0.3}s`;
    }
}

// Animate the very first screen as soon as the page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => animateText('screen-0'), 200);
});

// Start the journey and play music
function startJourney() {
    const music = document.getElementById("bg-music");
    const decorContainer = document.querySelector(".full-page-decor");

    music.play().catch(error => {
        console.log("Audio autoplay was blocked by the browser.");
    });

    document.getElementById("screen-0").classList.remove("active");
    document.getElementById("screen-0").classList.add("hidden");

    setTimeout(() => {
        document.getElementById("screen-1").classList.remove("hidden");
        document.getElementById("screen-1").classList.add("active");
        
        // Trigger word animation for page 1
        animateText('screen-1'); 
        
        for(let i = 0; i < 20; i++) {
            createFloatingItem(decorContainer);
        }
    }, 1000); 
}

// Transition to the next page
function nextPage(currentScreen) {
    document.getElementById(`screen-${currentScreen}`).classList.remove("active");
    document.getElementById(`screen-${currentScreen}`).classList.add("hidden");
    
    setTimeout(() => {
        const next = currentScreen + 1;
        document.getElementById(`screen-${next}`).classList.remove("hidden");
        document.getElementById(`screen-${next}`).classList.add("active");
        
        // Trigger word animation for the new page
        animateText(`screen-${next}`); 
    }, 1000); 
}

// When she clicks Yes
function sayYes() {
    nextPage(3);
}

// Make the "No" button run away
const noBtn = document.getElementById("no-btn");

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", moveButton); 

function moveButton() {
    const containerRect = document.querySelectorNormally I can help with things like this, but I don't seem to have access to that content. You can try again or ask me for something else.
