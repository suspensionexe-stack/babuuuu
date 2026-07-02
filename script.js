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

// Start the journey and play music
function startJourney() {
    const music = document.getElementById("bg-music");
    const decorContainer = document.querySelector(".full-page-decor");

    // Play music (if not blocked)
    music.play().catch(error => {
        console.log("Audio autoplay was blocked by the browser. It will play when the user interacts again.");
    });

    // Fade out screen-0
    document.getElementById("screen-0").classList.remove("active");
    document.getElementById("screen-0").classList.add("hidden");

    // Transition to screen-1
    setTimeout(() => {
        document.getElementById("screen-1").classList.remove("hidden");
        document.getElementById("screen-1").classList.add("active");
        
        // Add more random floating small items to the full-page decor
        for(let i = 0; i < 20; i++) {
            createFloatingItem(decorContainer);
        }
    }, 1500); // Slower fade for dramatic effect
}

// Transition to the next page
function nextPage(currentScreen) {
    document.getElementById(`screen-${currentScreen}`).classList.remove("active");
    document.getElementById(`screen-${currentScreen}`).classList.add("hidden");
    
    setTimeout(() => {
        const next = currentScreen + 1;
        document.getElementById(`screen-${next}`).classList.remove("hidden");
        document.getElementById(`screen-${next}`).classList.add("active");
    }, 1000); // 1 second for a smooth cross-fade effect
}

// When she clicks Yes
function sayYes() {
    nextPage(3);
}

// Make the "No" button run away
const noBtn = document.getElementById("no-btn");

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", moveButton); // Just in case she taps it on mobile

function moveButton() {
    const containerRect = document.querySelector(".container").getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate dynamic safe zone boundaries to keep button inside
    const maxX = containerRect.width - btnRect.width - 50; 
    const maxY = containerRect.height - btnRect.height - 50;

    // Generate random coordinates inside safe zone
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) - (containerRect.height / 2) + (btnRect.height * 2);

    // Apply the position
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Play a tiny, soft bounce effect when it moves
    noBtn.style.animation = 'bounce 0.1s ease-out';
    setTimeout(() => { noBtn.style.animation = ''; }, 100);
}
