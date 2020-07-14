const body = document.querySelector("body"),
    bgForm = document.querySelector(".js-bgForm"),
    bgInput = bgForm.querySelector("input")

let image = new Image();

function paintRandomImage() {
    image.src = `https://source.unsplash.com/random/1600x900`;
    image.classList.add("bgImage")
    body.appendChild(image);
}

function paintImage(keyWord) {
    image.src = `https://source.unsplash.com/1600x900/?${keyWord.split(" ").join(",")}`;
    const oldImage = document.body.querySelector(".bgImage")
    body.removeChild(oldImage);
    body.appendChild(image);
}

function submitHandle(event) {
    event.preventDefault();
    const imgKeyword = bgInput.value;
    paintImage(imgKeyword);
}

function init() {
    paintRandomImage();
    bgForm.addEventListener("submit", submitHandle);
}

init();