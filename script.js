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

let firstNumberStorage = '';
let secondNumberStorage = '';

//target text box
const textBox = document.querySelector('#textBox');
let textBoxDisplay = document.createElement('span');

textBox.appendChild(textBoxDisplay);

//target buttons
const numberButtons = document.querySelectorAll('.numberButtons');

//when we are expecting to add digits to firstNumber, status is true
//else, status is false
let inputStatus = true;


const displayOnScreen = function(event) {
    if ( inputStatus === true ) {
        textBoxDisplay.textContent = firstNumberStorage;
    } else {
        textBoxDisplay.textContent = secondNumberStorage;
    }
}

const updateNumber = function (event) {
    let currentDisplayText = textBoxDisplay.textContent;
    console.log(`Current text: ${textBoxDisplay.textContent}`);
    //If current text is not an operator
    //it means we're still inputting the first Number
    if ( inputStatus === false ) { 
        secondNumberStorage += event.target.textContent;
        secondNumber = Number(secondNumberStorage);
        console.log(`Current second Number: ${secondNumber}`);
    } else {
        firstNumberStorage += event.target.textContent;
        firstNumber = Number(firstNumberStorage); 
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

    textBoxDisplay.textContent = event.target.textContent;
    inputStatus = false;
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

    //this is to reset the states back to input firstNumber 
    inputStatus = true;
    firstNumber = result;
    //firstNumberStorage = '' but no need cause it's already a result
    secondNumberStorage = '' //reset back to nothing to wait for another number to perform operations on
})






