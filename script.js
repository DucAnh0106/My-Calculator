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

function roundUpNumber( number ) {
    //my intention is to round up result to at most 15 DP (prevent infinite decimal points)
    let roundedNum = number * (10 ** 15);

    return Math.round(roundedNum) / (10 ** 15);
}

let firstNumber;
let operator;
let secondNumber;

let userInputBuffer = '';

//server to remember have we click the equal button
//work even if the user spam clicking Equal
let isEqualButtonClicked = false;

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

    //check if the user's intent after clicking equal is to restart all calculations
    //click a number after equal
    if (isEqualButtonClicked) {
        userInputBuffer = '';
        userInputBuffer += event.target.textContent;

        isEqualButtonClicked = false; //reset the state to test user's intent for next operation
    } else {
        userInputBuffer += event.target.textContent;
    }

    //display user enter on screen
    displayOnScreen(event);
}

numberButtons.forEach( button => {
    button.addEventListener('click', editNumber);
});

//target operators
const operators = document.querySelectorAll('.operators');

const chooseOperator = function(event) {
    //display operator on the screen
    operator = event.target.textContent;
    textBoxDisplay.textContent = operator;

    //if an operator is pressed after the equal button is pressed (for 2nd operation onward)
    if (isEqualButtonClicked) {
        isEqualButtonClicked = false; //reset the state to test user's intent for next operation
        
        firstNumber = result;
        userInputBuffer = ''; //switch to edit the second Number

    } else {
        firstNumber = Number(userInputBuffer); //finalize first number
        userInputBuffer = ''; //Switch back to edit the second Number
    }

}

operators.forEach( operator => {
    operator.addEventListener('click', chooseOperator);
})

//target equal button
const equalButton = document.querySelector('#equalButton');
let result;

equalButton.addEventListener('click', (event) => {
    // finalize the second number
    secondNumber = Number(userInputBuffer);

    //output the result
    result = roundUpNumber( operation(firstNumber, operator, secondNumber) );
    textBoxDisplay.textContent = result;

    //change state of equal button
    isEqualButtonClicked = true;
})

//Code for AC and DEL
const topRowFunctions_buttons = document.querySelectorAll('.topRowFunctions_buttons');

const clearText = function() {

}

const deleteText = function() {

}

const addPercentage = function() {

}


topRowFunctions_buttons.forEach( button => {
    if (button.textContent === 'AC') {
        button.addEventListener('click', clearText );
    } else if (button.textContent === 'DEL') {
        button.addEventListener('click', deleteText );
    } else {
        button.addEventListener('click', addPercentage );
    }
})




