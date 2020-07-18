const nameForm = document.querySelector(".js-nameForm"),
    input = nameForm.querySelector("input"),
    greeting = document.querySelector(".js-greeting")
    ;

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
    }

function handleNameSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function showRename(event) {
    event.preventDefault();
    greetingMsg = event.target;
    parent = greetingMsg.parentNode;
    renameMsg = parent.querySelector(".renameMsg");
    greetingMsg.classList.remove(SHOWING_CN);
    renameMsg.classList.add(SHOWING_CN);
}

function showGreetingMsg(event) {
    event.preventDefault();
    renameMsg = event.target;
    parent = greetingMsg.parentNode;
    greetingMsg = parent.querySelector(".greetingMsg");
    renameMsg.classList.remove(SHOWING_CN);
    greetingMsg.classList.add(SHOWING_CN);
};

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleNameSubmit);
}

function rename(event) {
    event.preventDefault();
    while (greeting.firstChild) {
        greeting.removeChild(greeting.firstChild);
    }
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    askForName();
}

function makeRename() {
    const span = document.createElement("span");
    span.classList.add("renameMsg");
    span.innerText = "R e n a m e";
    span.addEventListener("mouseout", showGreetingMsg);
    span.addEventListener("click", rename);
    greeting.appendChild(span);
}

function paintGreeting(text) {
    const span = document.createElement("span")
    span.classList.add("greetingMsg");
    span.innerText = `Hello, ${text}`;
    makeRename();
    span.addEventListener("mouseover", showRename);
    span.classList.add(SHOWING_CN);
    greeting.appendChild(span);
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
}

function loadName() {
    const currentUser  = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init() ; 