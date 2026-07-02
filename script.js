// Creates random tiny floating items in the background
function createFloatingItems() {
    const container = document.getElementById('decor-container');
    const types = ['💖', '✨', '⭐', '🌸', '🤍'];
    
    for(let i = 0; i < 15; i++) {
        const item = document.createElement('div');
        item.className = 'small-item';
        item.innerText = types[Math.floor(Math.random() * types.length)];
        item.style.fontSize = `${1 + Math.random()}rem`;
        item.style.top = `${Math.random() * 100}%`;
        item.style.left = `${Math.random() * 100}%`;
        item.style.opacity = 0.3 + Math.random() * 0.5;
        item.style.animation = `floatTiny ${2 + Math.random() * 2}s ease-in-out infinite`;
        container.appendChild(item);
    }
}

// The Magic Word-by-Word Animation
function animateText(screenId) {
    const screen = document.getElementById(screenId);
    const textElements = screen.querySelectorAll('h1, h2, p');
    let totalDelay = 0; // Tracks time for the button to wait

    textElements.forEach(el => {
        if (el.dataset.animated) return; // Prevents running twice
        
        let text = el.innerHTML.trim();
        text = text.replace(/<br\s*\/?>/gi, ' ^ '); 
        
        let words = text.split(/\s+/);
        el.innerHTML = ''; 
        
        words.forEach(word => {
            if (word === '^') {
                el.appendChild(document.createElement('br'));
            } else if (word !== '') {
                let span = document.createElement('span');
                span.className = 'word';
                span.innerHTML = word;
                span.style.animation = `fadeInWord 0.4s ease forwards ${totalDelay}s`;
                el.appendChild(span);
                el.appendChild(document.createTextNode(' '));
                
                totalDelay += 0.12; 
            }
        });
        
        el.dataset.animated = 'true';
    });
    
    // Unlocks the buttons after all the words are completely written
    const buttonGroup = screen.querySelector('.action-btn, .buttons');
    if (buttonGroup) {
        // Method 1: CSS Animation
        buttonGroup.style.animation = `fadeInBtn 1s ease forwards ${totalDelay + 0.3}s`;
        
        // Method 2: JavaScript Failsafe (Forces button to become clickable no matter what)
        setTimeout(() => {
            buttonGroup.style.opacity = '1';
            buttonGroup.style.visibility = 'visible';
            buttonGroup.style.pointerEvents = 'auto';
        }, (totalDelay + 1.5) * 1000); 
    }
}

// Move to Screen 1 and Play Music
function startJourney() {
    const music = document.getElementById("bg-music");
    music.play().catch(e => console.log("Audio blocked by browser."));

    document.getElementById("screen-0").classList.remove("active");
    document.getElementById("screen-0").classList.add("hidden");

    document.getElementById("screen-1").classList.remove("hidden");
    document.getElementById("screen-1").classList.add("active");
    
    animateText('screen-1'); 
    createFloatingItems();
}

// Move between pages
function nextPage(currentScreen) {
    document.getElementById(`screen-${currentScreen}`).classList.remove("active");
    document.getElementById(`screen-${currentScreen}`).classList.add("hidden");
    
    const next = currentScreen + 1;
    document.getElementById(`screen-${next}`).classList.remove("hidden");
    document.getElementById(`screen-${next}`).classList.add("active");
    
    animateText(`screen-${next}`); 
}

// When she finally says Yes!
function sayYes() {
    nextPage(3);
}

// The Runaway "No" Button Logic
const noBtn = document.getElementById("no-btn");

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", moveButton); 

function moveButton() {
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 40; 
    const maxY = containerRect.height - btnRect.height - 40;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) - (containerRect.height / 2) + 50;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    noBtn.style.animation = 'bounce 0.2s ease-out';
    setTimeout(() => { noBtn.style.animation = ''; }, 200);
}

// Start the text animation strictly and immediately on load
animateText('screen-0');

