// Start the journey and play music
function startJourney() {
    let music = document.getElementById("bg-music");
    music.play().catch(error => {
        console.log("Audio autoplay was blocked by the browser.");
    });
    
    document.getElementById("screen-0").classList.remove("active");
    document.getElementById("screen-0").classList.add("hidden");
    
    setTimeout(() => {
        document.getElementById("screen-1").classList.remove("hidden");
        document.getElementById("screen-1").classList.add("active");
    }, 100);
}

// Transition to the next page
function nextPage(currentScreen) {
    document.getElementById(`screen-${currentScreen}`).classList.remove("active");
    document.getElementById(`screen-${currentScreen}`).classList.add("hidden");
    
    setTimeout(() => {
        let next = currentScreen + 1;
        document.getElementById(`screen-${next}`).classList.remove("hidden");
        document.getElementById(`screen-${next}`).classList.add("active");
    }, 500); // Wait half a second for a smooth fade effect
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
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate maximum positions to keep the button inside the white box
    const maxX = containerRect.width - btnRect.width - 40; 
    const maxY = containerRect.height - btnRect.height - 40;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) - (containerRect.height / 2) + 50;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}
