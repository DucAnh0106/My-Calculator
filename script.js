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
    } else if (operator === '×') {
        return multiplyNumbers(firstNumber, secondNumber);
    } else {
        return divideNumbers(firstNumber, secondNumber);
}
}

let firstNumber;
let operator;
let secondNumber;

let userInputBuffer = '';

//target text box
const textBox = document.querySelector('#textBox');
let textBoxDisplay = document.createElement('span');
textBox.appendChild(textBoxDisplay);

//target buttons
const numberButtons = document.querySelectorAll('.numberButtons');

const displayOnScreen = function() {
    textBoxDisplay.textContent = userInputBuffer;
}

const editNumber = function (event) {
    userInputBuffer += event.target.textContent;
    displayOnScreen(event);
}

numberButtons.forEach( button => {
    button.addEventListener('click', editNumber);
});

//target operators
const operators = document.querySelectorAll('.operators');

const chooseOperator = function(event) {
    operator = event.target.textContent;
    textBoxDisplay.textContent = operator;

    firstNumber = Number( userInputBuffer );
    userInputBuffer = ''; //Switch back to edit mode
}

operators.forEach( operator => {
    operator.addEventListener('click', chooseOperator);
})

//target equal button
const equalButton = document.querySelector('#equalButton');
let result;

equalButton.addEventListener('click', (event) => {
    secondNumber = Number(userInputBuffer); // finalize mode for second Num

    result = operation(firstNumber, operator, secondNumber);
    textBoxDisplay.textContent = result;

    firstNumber = result; //to chain operations
    userInputBuffer = ''; //reset to edit mode
})






