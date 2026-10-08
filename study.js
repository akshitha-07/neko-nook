const penguins = {

    flurry: {
        name: "Flurry",
        mood: "Struggling to start",
        image: "img/flurry.jpg",
        motivation:
            "You don't have to feel ready to begin. Let's start small, settle in, and make these first few minutes count."
    },

    frost: {
        name: "Frost",
        mood: "Burnout / exhausted",
        image: "img/frost.jpg",
        motivation:
            "Some days your mind needs a little more patience. Take a breath, slow down, and let studying happen one small step at a time."
    },

    glacier: {
        name: "Glacier",
        mood: "Motivation is sky-high",
        image: "img/glacier.jpg",
        motivation:
            "You've got the energy today, so let's use it well. Stay focused, enjoy the momentum, and build something you'll be proud of."
    },

    iceberg: {
        name: "Iceberg",
        mood: "Exam crunch / stress",
        image: "img/iceberg.jpg",
        motivation:
            "The exam can feel huge when you look at everything at once. Forget the whole mountain for now. Just focus on the next chapter, question, or page."
    }

};


// ------------------------------------------
// Get selected penguin from URL
// ------------------------------------------

const params = new URLSearchParams(window.location.search);

const selectedPenguin =
    params.get("penguin") || "flurry";

const penguin =
    penguins[selectedPenguin] || penguins.flurry;


// ------------------------------------------
// Penguin elements
// ------------------------------------------

const penguinName =
    document.getElementById("penguinName");

const penguinMood =
    document.getElementById("penguinMood");

const penguinImage =
    document.getElementById("penguinImage");

const motivationText =
    document.getElementById("motivationText");


penguinName.textContent = penguin.name;

penguinMood.textContent = penguin.mood;

penguinImage.src = penguin.image;

penguinImage.alt = `${penguin.name} the penguin`;

motivationText.textContent = penguin.motivation;


// ------------------------------------------
// Timer settings
// ------------------------------------------

let timerSettings = {

    focus: 25 * 60,

    short: 5 * 60,

    long: 10 * 60

};


let currentMode = "focus";

let remainingSeconds =
    timerSettings[currentMode];

let timerInterval = null;

let isRunning = false;


// ------------------------------------------
// Timer elements
// ------------------------------------------

const timerDisplay =
    document.getElementById("timer");

const timerMode =
    document.getElementById("timerMode");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const modeButtons =
    document.querySelectorAll(".mode-btn");


// ------------------------------------------
// Settings elements
// ------------------------------------------

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsPanel =
    document.getElementById("settingsPanel");

const saveSettings =
    document.getElementById("saveSettings");

const focusInput =
    document.getElementById("focusInput");

const shortInput =
    document.getElementById("shortInput");

const longInput =
    document.getElementById("longInput");


// ------------------------------------------
// Settings panel
// ------------------------------------------

settingsBtn.addEventListener("click", function () {

    settingsPanel.classList.toggle("show");

});


// ------------------------------------------
// Save timer settings
// ------------------------------------------

saveSettings.addEventListener("click", function () {

    const focusMinutes =
        Number(focusInput.value);

    const shortMinutes =
        Number(shortInput.value);

    const longMinutes =
        Number(longInput.value);


    // Validate values

    if (
        !Number.isFinite(focusMinutes) ||
        !Number.isFinite(shortMinutes) ||
        !Number.isFinite(longMinutes) ||

        focusMinutes < 1 ||
        shortMinutes < 1 ||
        longMinutes < 1 ||

        focusMinutes > 120 ||
        shortMinutes > 60 ||
        longMinutes > 120
    ) {

        alert(
            "Please enter valid timer values."
        );

        return;
    }


    timerSettings.focus =
        focusMinutes * 60;

    timerSettings.short =
        shortMinutes * 60;

    timerSettings.long =
        longMinutes * 60;


    // Reset current timer to new setting

    pauseTimer();

    remainingSeconds =
        timerSettings[currentMode];

    updateDisplay();


    settingsPanel.classList.remove("show");

});


// ------------------------------------------
// Change timer mode
// ------------------------------------------

modeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const mode =
            button.dataset.mode;

        switchMode(mode);

    });

});


function switchMode(mode) {

    pauseTimer();

    currentMode = mode;

    remainingSeconds =
        timerSettings[currentMode];


    modeButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );

    });


    updateModeText();

    updateDisplay();

}


// ------------------------------------------
// Update mode title
// ------------------------------------------

function updateModeText() {

    if (currentMode === "focus") {

        timerMode.textContent =
            "Focus Time";

    }

    else if (currentMode === "short") {

        timerMode.textContent =
            "Short Break";

    }

    else if (currentMode === "long") {

        timerMode.textContent =
            "Long Break";

    }

}


// ------------------------------------------
// Start timer
// ------------------------------------------

startBtn.addEventListener("click", function () {

    if (isRunning) {
        return;
    }


    isRunning = true;


    startBtn.classList.add("hidden");

    pauseBtn.classList.remove("hidden");

    resetBtn.classList.remove("hidden");


    timerInterval = setInterval(function () {

        remainingSeconds--;

        updateDisplay();


        if (remainingSeconds <= 0) {

            remainingSeconds = 0;

            updateDisplay();

            pauseTimer();

            alert(
                `${timerMode.textContent} is finished!`
            );

        }

    }, 1000);

});


// ------------------------------------------
// Pause timer
// ------------------------------------------

pauseBtn.addEventListener("click", function () {

    pauseTimer();

});


function pauseTimer() {

    isRunning = false;


    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

    }


    startBtn.classList.remove("hidden");

    pauseBtn.classList.add("hidden");

    resetBtn.classList.remove("hidden");

}


// ------------------------------------------
// Reset timer
// ------------------------------------------

resetBtn.addEventListener("click", function () {

    pauseTimer();

    remainingSeconds =
        timerSettings[currentMode];

    updateDisplay();

});


// ------------------------------------------
// Update timer display
// ------------------------------------------

function updateDisplay() {

    const minutes =
        Math.floor(remainingSeconds / 60);

    const seconds =
        remainingSeconds % 60;


    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


updateModeText();

updateDisplay();