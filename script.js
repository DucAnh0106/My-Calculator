function addNumbers(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtractNumbers(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function divideNumbers(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function multiplyNumbers(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function operation(firstNumber, operator, secondNumber) {
    if (operator === '+') {
        return addNumbers(firstNumber, secondNumber);
    } else if (operator === '-') {
        return subtractNumbers(firstNumber, secondNumber);
    } else if (operator === '*') {
        return multiplyNumbers(firstNumber, secondNumber);
    } else {
        return divideNumbers(firstNumber, secondNumber);
}
}

let firstNumber;
let operator;
let secondNumber;

//target text box
const textBox = document.querySelector('#textBox');
let textBoxDisplay = document.createElement('span');

textBox.appendChild(textBoxDisplay);

//target buttons
const numberButtons = document.querySelectorAll('.numberButtons');

const updateAndDisplayNumber = function (event) {
    firstNumber = Number(event.target.textContent);
    textBoxDisplay.textContent = event.target.textContent;
}

numberButtons.forEach( button => {
    button.addEventListener('click', updateAndDisplayNumber);
});







