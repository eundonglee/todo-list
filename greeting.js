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

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleNameSubmit);
}

function rename() {
    event.preventDefault();
    const userName = event.target;
    const greetingToName = userName.parentNode;
    greeting.removeChild(greetingToName);
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    askForName();
}

function paintGreeting(text) {
    const div = document.createElement("div")
    const spanMsg = document.createElement("span");
    const spanName = document.createElement("span");
    spanMsg.innerText = "Hello, ";
    spanName.innerText = `${text}`;
    spanName.title = "Rename";
    spanName.classList.add("pointer", "hoverUnderline");
    spanName.addEventListener("click", rename)
    div.appendChild(spanMsg);
    div.appendChild(spanName);
    greeting.appendChild(div);
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