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


const displayOnScreen = function(event) {
    textBoxDisplay.textContent = event.target.textContent;
}

const updateNumber = function (event) {
    let currentDisplayText = textBoxDisplay.textContent;
    console.log(`Current text: ${textBoxDisplay.textContent}`);
    //If current text is not an operator
    //it means we're still inputting the first Number
    if ( isNaN(currentDisplayText) ) { 
        secondNumber = Number(event.target.textContent);
        console.log(`Current second Number: ${secondNumber}`);
    } else {
        firstNumber = Number(event.target.textContent); 
        console.log(`Current first Number: ${firstNumber}`);
    }

    displayOnScreen(event);
}

numberButtons.forEach( button => {
    button.addEventListener('click', updateNumber);
});

//target operators
const operators = document.querySelectorAll('.operators');

const updateOperator = function(event) {
    operator = event.target.textContent;
    displayOnScreen(event);
    console.log(`Current text: ${textBoxDisplay.textContent}`);
}

operators.forEach( operator => {
    operator.addEventListener('click', updateOperator);
})

//target equal button
const equalButton = document.querySelector('#equalButton');
let result;

equalButton.addEventListener('click', (event) => {
    result = operation(firstNumber, operator, secondNumber);
    textBoxDisplay.textContent = result;
})






