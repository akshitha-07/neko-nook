const grabSeatButton = document.querySelector(".primary-btn");
if (grabSeatButton) {
    grabSeatButton.addEventListener("click", function() {
        window.location.href = "todo.html";
    });
}
const enterCafeButton = document.querySelector(".nav-btn");
if (enterCafeButton) {
    enterCafeButton.addEventListener("click", function() {
        window.location.href = "todo.html";
    });
}
const meetPenguinsButton = document.querySelector(".secondary-btn");
if (meetPenguinsButton) {
    meetPenguinsButton.addEventListener("click", function(event) {
        event.preventDefault();
        const penguinSection = document.querySelector("#choice");
        if (penguinSection) {
            penguinSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}
const homeLink = document.querySelector('.navbar a[href="#home"]');
if (homeLink) {
    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector("#home").scrollIntoView({
            behavior: "smooth"
        });
    });
}
const featuresLink = document.querySelector('.navbar a[href="#features"]');
if (featuresLink) {
    featuresLink.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector("#features").scrollIntoView({
            behavior: "smooth"
        });
    });
}
const contactLink = document.querySelector('.navbar a[href="#footer"]');
if (contactLink) {
    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector("#footer").scrollIntoView({
            behavior: "smooth"
        });
    });
}
const logo = document.querySelector(".logo");
if (logo) {
    logo.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    });
}
const penguinCards = document.querySelectorAll(".penguin-card");
penguinCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const penguin = card.dataset.penguin;
        window.location.href = `study.html?penguin=${penguin}`;
    });
});